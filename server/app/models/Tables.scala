package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends Tables {
  val profile = slick.jdbc.PostgresProfile
}

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Has.schema ++ Product.schema ++ Stores.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Has
   *  @param relationId Database column relation_id SqlType(serial), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(int4)
   *  @param storeId Database column store_id SqlType(int4)
   *  @param units Database column units SqlType(bpchar), Length(20,false)
   *  @param currentPrice Database column current_price SqlType(float8)
   *  @param amount Database column amount SqlType(varchar), Length(255,true) */
  case class HasRow(relationId: Int, productId: Int, storeId: Int, units: String, currentPrice: Double, amount: String)
  /** GetResult implicit for fetching HasRow objects using plain SQL queries */
  implicit def GetResultHasRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Double]): GR[HasRow] = GR{
    prs => import prs._
    HasRow.tupled((<<[Int], <<[Int], <<[Int], <<[String], <<[Double], <<[String]))
  }
  /** Table description of table has. Objects of this class serve as prototypes for rows in queries. */
  class Has(_tableTag: Tag) extends profile.api.Table[HasRow](_tableTag, "has") {
    def * = (relationId, productId, storeId, units, currentPrice, amount).<>(HasRow.tupled, HasRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(relationId), Rep.Some(productId), Rep.Some(storeId), Rep.Some(units), Rep.Some(currentPrice), Rep.Some(amount))).shaped.<>({r=>import r._; _1.map(_=> HasRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column relation_id SqlType(serial), AutoInc, PrimaryKey */
    val relationId: Rep[Int] = column[Int]("relation_id", O.AutoInc, O.PrimaryKey)
    /** Database column product_id SqlType(int4) */
    val productId: Rep[Int] = column[Int]("product_id")
    /** Database column store_id SqlType(int4) */
    val storeId: Rep[Int] = column[Int]("store_id")
    /** Database column units SqlType(bpchar), Length(20,false) */
    val units: Rep[String] = column[String]("units", O.Length(20,varying=false))
    /** Database column current_price SqlType(float8) */
    val currentPrice: Rep[Double] = column[Double]("current_price")
    /** Database column amount SqlType(varchar), Length(255,true) */
    val amount: Rep[String] = column[String]("amount", O.Length(255,varying=true))

    /** Foreign key referencing Product (database name has_product_id_fkey) */
    lazy val productFk = foreignKey("has_product_id_fkey", productId, Product)(r => r.productId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Stores (database name has_store_id_fkey) */
    lazy val storesFk = foreignKey("has_store_id_fkey", storeId, Stores)(r => r.storeId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Has */
  lazy val Has = new TableQuery(tag => new Has(tag))

  /** Entity class storing rows of table Product
   *  @param productId Database column product_id SqlType(int4), PrimaryKey
   *  @param category Database column category SqlType(bpchar), Length(200,false)
   *  @param name Database column name SqlType(bpchar), Length(200,false) */
  case class ProductRow(productId: Int, category: String, name: String)
  /** GetResult implicit for fetching ProductRow objects using plain SQL queries */
  implicit def GetResultProductRow(implicit e0: GR[Int], e1: GR[String]): GR[ProductRow] = GR{
    prs => import prs._
    ProductRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table product. Objects of this class serve as prototypes for rows in queries. */
  class Product(_tableTag: Tag) extends profile.api.Table[ProductRow](_tableTag, "product") {
    def * = (productId, category, name).<>(ProductRow.tupled, ProductRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(productId), Rep.Some(category), Rep.Some(name))).shaped.<>({r=>import r._; _1.map(_=> ProductRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column product_id SqlType(int4), PrimaryKey */
    val productId: Rep[Int] = column[Int]("product_id", O.PrimaryKey)
    /** Database column category SqlType(bpchar), Length(200,false) */
    val category: Rep[String] = column[String]("category", O.Length(200,varying=false))
    /** Database column name SqlType(bpchar), Length(200,false) */
    val name: Rep[String] = column[String]("name", O.Length(200,varying=false))
  }
  /** Collection-like TableQuery object for table Product */
  lazy val Product = new TableQuery(tag => new Product(tag))

  /** Entity class storing rows of table Stores
   *  @param storeId Database column store_id SqlType(int4), PrimaryKey
   *  @param productIds Database column product_ids SqlType(_int4), Length(10,false)
   *  @param zipCode Database column zip_code SqlType(int4) */
  case class StoresRow(storeId: Int, productIds: String, zipCode: Int)
  /** GetResult implicit for fetching StoresRow objects using plain SQL queries */
  implicit def GetResultStoresRow(implicit e0: GR[Int], e1: GR[String]): GR[StoresRow] = GR{
    prs => import prs._
    StoresRow.tupled((<<[Int], <<[String], <<[Int]))
  }
  /** Table description of table stores. Objects of this class serve as prototypes for rows in queries. */
  class Stores(_tableTag: Tag) extends profile.api.Table[StoresRow](_tableTag, "stores") {
    def * = (storeId, productIds, zipCode).<>(StoresRow.tupled, StoresRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(storeId), Rep.Some(productIds), Rep.Some(zipCode))).shaped.<>({r=>import r._; _1.map(_=> StoresRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column store_id SqlType(int4), PrimaryKey */
    val storeId: Rep[Int] = column[Int]("store_id", O.PrimaryKey)
    /** Database column product_ids SqlType(_int4), Length(10,false) */
    val productIds: Rep[String] = column[String]("product_ids", O.Length(10,varying=false))
    /** Database column zip_code SqlType(int4) */
    val zipCode: Rep[Int] = column[Int]("zip_code")
  }
  /** Collection-like TableQuery object for table Stores */
  lazy val Stores = new TableQuery(tag => new Stores(tag))
}
