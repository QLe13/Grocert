package controllers

import javax.inject._

import play.api.mvc._
import java.lang.ProcessBuilder.Redirect
import  play.api.libs.json._

case class Item(id: Int, name: String, unit: String, amount: Int, image: String, category: String)
case class ItemAndCost(item: Item, cost: Int)
case class StoreCalculation(storeId: Int, storeName: String, totalCost: Double, cart: List[ItemAndCost])

@Singleton
class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc){
  implicit val itemReads = Json.reads[Item]
  implicit val itemWrites = Json.writes[Item]
  implicit val itemAndCostReads = Json.reads[ItemAndCost]
  implicit val itemAndCostWrites = Json.writes[ItemAndCost]
  implicit val storeCalculationReads = Json.reads[StoreCalculation]
  implicit val storeCalculationWrites = Json.writes[StoreCalculation]
  
  def itemSearch = Action {
    Ok(Json.toJson(List(ExampleObjects.exampleItems)))
  }

  def calculateCart = Action {
    Ok(Json.toJson(ExampleObjects.exampleCartCalculation))
  }
}

object ExampleObjects {
  val exampleItems = List(
    Item(323212, "Banana", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323213, "Apple", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323214, "Orange", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323215, "Grape", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323216, "Avocado", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323217, "Milk", "lb", 5, "https://picsum.photos/200/300", "produce"),
    Item(323218, "Pizza", "lb", 5, "https://picsum.photos/200/300", "produce"),
  )

  val exampleCartCalculation = List(
    StoreCalculation(141234, "HEB", 7000, 
      exampleItems.map(item => ItemAndCost(item, 1000))
    ),
    StoreCalculation(141235, "Sprouts", 14000, 
      exampleItems.map(item => ItemAndCost(item, 2000))
    ),
  )
}
