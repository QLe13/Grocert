name := """play-scala-react-seed"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
  )

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.13.12"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
libraryDependencies ++= Seq(
  "com.typesafe.slick" %% "slick-codegen" % "3.4.1",
  "org.postgresql" % "postgresql" % "42.2.11",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.4.1",
  "org.mindrot" % "jbcrypt" % "0.4"
)


addCommandAlias(
  "validateCode",
  "scalafmtSbtCheck; scalafmtCheckAll; uiCodeStyleCheck"
)
