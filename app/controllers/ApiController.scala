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
  implicit val itemReads: play.api.libs.json.Reads[controllers.Item] = Json.reads[Item]
  implicit val itemWrites: play.api.libs.json.OWrites[controllers.Item]= Json.writes[Item]
  implicit val itemAndCostReads: play.api.libs.json.Reads[controllers.ItemAndCost]= Json.reads[ItemAndCost]
  implicit val itemAndCostWrites: play.api.libs.json.OWrites[controllers.ItemAndCost]= Json.writes[ItemAndCost]
  implicit val storeCalculationReads: play.api.libs.json.Reads[controllers.StoreCalculation]= Json.reads[StoreCalculation]
  implicit val storeCalculationWrites: play.api.libs.json.OWrites[controllers.StoreCalculation]= Json.writes[StoreCalculation]
  implicit val itemSearchRequestReads: play.api.libs.json.Reads[controllers.ItemSearchRequest]= Json.reads[ItemSearchRequest]
  implicit val calculateCartRequestReads: play.api.libs.json.Reads[controllers.CalculateCartRequest]= Json.reads[CalculateCartRequest]


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
  
  def itemSearch(searchTerm: String) = Action { implicit request =>
    Ok(Json.toJson(List(ExampleObjects.exampleItems)))
  }

  def calculateCart = Action { implicit request =>
    println(request.body)
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
