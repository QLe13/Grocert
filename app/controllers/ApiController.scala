package controllers

import javax.inject._

import play.api.mvc._
import java.lang.ProcessBuilder.Redirect
import  play.api.libs.json._

case class Item(id: Int, name: String, unit: String, amount: Int, image: String, category: String)
case class ItemAndCost(item: Item, cost: Int)
case class StoreCalculation(storeId: Int, storeName: String, totalCost: Double, cart: List[ItemAndCost])
case class ItemSearchRequest(searchTerm: String)
case class CalculateCartRequest(zipCode: Int, itemIds: List[Int])

@Singleton
class ApiController @Inject()(cc: ControllerComponents) extends AbstractController(cc){
  implicit val itemReads = Json.reads[Item]
  implicit val itemWrites = Json.writes[Item]
  implicit val itemAndCostReads = Json.reads[ItemAndCost]
  implicit val itemAndCostWrites = Json.writes[ItemAndCost]
  implicit val storeCalculationReads = Json.reads[StoreCalculation]
  implicit val storeCalculationWrites = Json.writes[StoreCalculation]
  implicit val itemSearchRequestReads = Json.reads[ItemSearchRequest]
  implicit val calculateCartRequestReads = Json.reads[CalculateCartRequest]


  def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body => 
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => 
          println(e)
          BadRequest(e.toString())
      }
    }.getOrElse(BadRequest("Bad request"))
  }
  
  def itemSearch = Action { implicit request =>
    withJsonBody[ItemSearchRequest] { req =>
      Ok(Json.toJson(List(ExampleObjects.exampleItems)))
    }
  }

  def calculateCart = Action { implicit request =>
    withJsonBody[CalculateCartRequest] { req =>
      Ok(Json.toJson(ExampleObjects.exampleCartCalculation))
    }
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
