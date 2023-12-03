package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import models.Tables._
import org.mindrot.jbcrypt.BCrypt
import controllers._
import scala.collection.mutable

class GroceryModel(db: Database)(implicit ec: ExecutionContext) {
  def itemSearchByName(searchTerm: String): Future[Seq[Item]] = {
    if (searchTerm == "") {
      return Future.successful(Seq[Item]())
    }
    db.run(
      (for {
        prod <- Product if prod.name.toLowerCase like s"%${searchTerm.toLowerCase}%"
        image <- Images if image.imageId === prod.imageId
      } yield {
        (prod.productId, prod.category, prod.name, image.imagePath, prod.amount, prod.units)
      }).result
    ).map { res => res.map { prod =>
      Item(prod._1, prod._3.trim(), prod._6.trim(), prod._5.trim(), prod._4, prod._2.trim())
    }}
  }

  def storeSearchByZip(zipCode: Int): Future[Seq[Store]] = {
    db.run(
      (for {
        store <- Stores if store.zipCode === zipCode
      } yield {
        (store.storeId, store.zipCode, store.storeName)
      }).result
    ).map { res => res.map { prod =>
      Store(prod._1, prod._3, prod._2)
    }}
  } 

  def calculateCart(stores: Seq[Store], productIds: Seq[Int]): Future[Seq[StoreCalculation]] = {
    val storeIds = stores.map(store => store.storeId)
    val initStoresAndCosts = stores.map { store =>
      StoreCalculation(store.storeId, store.storeName, 0, List[ItemAndCost]())
    }
    val storesAndCosts = mutable.Map[Int, StoreCalculation]()
    for (sac <- initStoresAndCosts) {
      storesAndCosts += (sac.storeId -> sac)
    }
    val hasAndProduct = Has join Product on (_.productId === _.productId)

    db.run(
      hasAndProduct.filter({ case (has, product) =>
        has.storeId.inSet(storeIds) &&
        product.productId.inSet(productIds)
      }).result
    ).map { rows => rows.foreach { case (has, product) =>
      val intPrice = (has.dollar.toString + has.cents.toString).toInt
      val osac = storesAndCosts.get(has.storeId)
      osac match {
        case None =>
          throw new Error("storeId not found")
        case Some(sac) =>
          val newTotalCost = sac.totalCost + intPrice
          val newCart = sac.cart :+ ItemAndCost(Item(product.productId, product.name.trim(), has.units.trim(), has.amount.trim(), "image", product.category.trim()), intPrice)
          storesAndCosts(has.storeId) = StoreCalculation(has.storeId, sac.storeName, newTotalCost, newCart)
      }
    }}.map(done => storesAndCosts.values.toList)
  }
}