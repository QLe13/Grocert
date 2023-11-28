package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import models.Tables._
import org.mindrot.jbcrypt.BCrypt
import controllers._

class GroceryModel(db: Database)(implicit ec: ExecutionContext) {
  def itemSearchByName(searchTerm: String): Future[Seq[Item]] = {
    if (searchTerm == "") {
      return Future.successful(Seq[Item]())
    }
    db.run(
      (for {
        prod <- Product if prod.name.toLowerCase like s"%${searchTerm.toLowerCase}%"
      } yield {
        (prod.productId, prod.category, prod.name)
      }).result
    ).map { res => res.map { prod =>
      Item(prod._1, prod._3, "TODO", -1, "TODO", prod._2)
    }}
  }
}