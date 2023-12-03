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
  lazy val schema: profile.SchemaDescription = Has.schema ++ Images.schema ++ Product.schema ++ Stores.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Has
   *  @param relationId Database column relation_id SqlType(serial), AutoInc, PrimaryKey
   *  @param productId Database column product_id SqlType(int4)
   *  @param storeId Database column store_id SqlType(int4)
   *  @param units Database column units SqlType(bpchar), Length(20,false)
   *  @param currentPrice Database column current_price SqlType(int4)
   *  @param amount Database column amount SqlType(varchar), Length(255,true) */
  case class HasRow(relationId: Int, productId: Int, storeId: Int, units: String, currentPrice: Int, amount: String)
  /** GetResult implicit for fetching HasRow objects using plain SQL queries */
  implicit def GetResultHasRow(implicit e0: GR[Int], e1: GR[String]): GR[HasRow] = GR{
    prs => import prs._
    HasRow.tupled((<<[Int], <<[Int], <<[Int], <<[String], <<[Int], <<[String]))
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
    /** Database column current_price SqlType(int4) */
    val currentPrice: Rep[Int] = column[Int]("current_price")
    /** Database column amount SqlType(varchar), Length(255,true) */
    val amount: Rep[String] = column[String]("amount", O.Length(255,varying=true))

    /** Foreign key referencing Product (database name has_product_id_fkey) */
    lazy val productFk = foreignKey("has_product_id_fkey", productId, Product)(r => r.productId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Stores (database name has_store_id_fkey) */
    lazy val storesFk = foreignKey("has_store_id_fkey", storeId, Stores)(r => r.storeId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Has */
  lazy val Has = new TableQuery(tag => new Has(tag))

  /** Entity class storing rows of table Images
   *  @param imageId Database column image_id SqlType(serial), AutoInc, PrimaryKey
   *  @param image Database column image SqlType(bytea)
   *  @param imagePath Database column image_path SqlType(varchar), Length(255,true) */
  case class ImagesRow(imageId: Int, image: Array[Byte], imagePath: String)
  /** GetResult implicit for fetching ImagesRow objects using plain SQL queries */
  implicit def GetResultImagesRow(implicit e0: GR[Int], e1: GR[Array[Byte]], e2: GR[String]): GR[ImagesRow] = GR{
    prs => import prs._
    ImagesRow.tupled((<<[Int], <<[Array[Byte]], <<[String]))
  }
  /** Table description of table images. Objects of this class serve as prototypes for rows in queries. */
  class Images(_tableTag: Tag) extends profile.api.Table[ImagesRow](_tableTag, "images") {
    def * = (imageId, image, imagePath).<>(ImagesRow.tupled, ImagesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(imageId), Rep.Some(image), Rep.Some(imagePath))).shaped.<>({r=>import r._; _1.map(_=> ImagesRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column image_id SqlType(serial), AutoInc, PrimaryKey */
    val imageId: Rep[Int] = column[Int]("image_id", O.AutoInc, O.PrimaryKey)
    /** Database column image SqlType(bytea) */
    val image: Rep[Array[Byte]] = column[Array[Byte]]("image")
    /** Database column image_path SqlType(varchar), Length(255,true) */
    val imagePath: Rep[String] = column[String]("image_path", O.Length(255,varying=true))

    /** Uniqueness Index over (imagePath) (database name images_image_path_key) */
    val index1 = index("images_image_path_key", imagePath, unique=true)
  }
  /** Collection-like TableQuery object for table Images */
  lazy val Images = new TableQuery(tag => new Images(tag))

  /** Entity class storing rows of table Product
   *  @param productId Database column product_id SqlType(int4), PrimaryKey
   *  @param category Database column category SqlType(bpchar), Length(200,false)
   *  @param name Database column name SqlType(bpchar), Length(200,false)
   *  @param imageId Database column image_id SqlType(int4), Default(None) */
  case class ProductRow(productId: Int, category: String, name: String, imageId: Option[Int] = None)
  /** GetResult implicit for fetching ProductRow objects using plain SQL queries */
  implicit def GetResultProductRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]]): GR[ProductRow] = GR{
    prs => import prs._
    ProductRow.tupled((<<[Int], <<[String], <<[String], <<?[Int]))
  }
  /** Table description of table product. Objects of this class serve as prototypes for rows in queries. */
  class Product(_tableTag: Tag) extends profile.api.Table[ProductRow](_tableTag, "product") {
    def * = (productId, category, name, imageId).<>(ProductRow.tupled, ProductRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(productId), Rep.Some(category), Rep.Some(name), imageId)).shaped.<>({r=>import r._; _1.map(_=> ProductRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column product_id SqlType(int4), PrimaryKey */
    val productId: Rep[Int] = column[Int]("product_id", O.PrimaryKey)
    /** Database column category SqlType(bpchar), Length(200,false) */
    val category: Rep[String] = column[String]("category", O.Length(200,varying=false))
    /** Database column name SqlType(bpchar), Length(200,false) */
    val name: Rep[String] = column[String]("name", O.Length(200,varying=false))
    /** Database column image_id SqlType(int4), Default(None) */
    val imageId: Rep[Option[Int]] = column[Option[Int]]("image_id", O.Default(None))

    /** Foreign key referencing Images (database name product_image_id_fkey) */
    lazy val imagesFk = foreignKey("product_image_id_fkey", imageId, Images)(r => Rep.Some(r.imageId), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Product */
  lazy val Product = new TableQuery(tag => new Product(tag))

  /** Entity class storing rows of table Stores
   *  @param storeId Database column store_id SqlType(int4), PrimaryKey
   *  @param zipCode Database column zip_code SqlType(int4)
   *  @param storeName Database column store_name SqlType(varchar), Length(255,true) */
  case class StoresRow(storeId: Int, zipCode: Int, storeName: String)
  /** GetResult implicit for fetching StoresRow objects using plain SQL queries */
  implicit def GetResultStoresRow(implicit e0: GR[Int], e1: GR[String]): GR[StoresRow] = GR{
    prs => import prs._
    StoresRow.tupled((<<[Int], <<[Int], <<[String]))
  }
  /** Table description of table stores. Objects of this class serve as prototypes for rows in queries. */
  class Stores(_tableTag: Tag) extends profile.api.Table[StoresRow](_tableTag, "stores") {
    def * = (storeId, zipCode, storeName).<>(StoresRow.tupled, StoresRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(storeId), Rep.Some(zipCode), Rep.Some(storeName))).shaped.<>({r=>import r._; _1.map(_=> StoresRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column store_id SqlType(int4), PrimaryKey */
    val storeId: Rep[Int] = column[Int]("store_id", O.PrimaryKey)
    /** Database column zip_code SqlType(int4) */
    val zipCode: Rep[Int] = column[Int]("zip_code")
    /** Database column store_name SqlType(varchar), Length(255,true) */
    val storeName: Rep[String] = column[String]("store_name", O.Length(255,varying=true))
  }
  /** Collection-like TableQuery object for table Stores */
  lazy val Stores = new TableQuery(tag => new Stores(tag))
}
