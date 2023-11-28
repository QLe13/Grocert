package models

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile",
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/grocery?user=lmartin9&password=0850151",
    "/Users/logan/Desktop/school/Web Apps/Grocery/app",
    "models", None, None, true, false
  )
}  
