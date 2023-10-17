name := """play-scala-react-seed"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
  )

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.13.12"

libraryDependencies ++= Seq(
  "com.google.inject"            % "guice"                % "6.0.0",
  "com.google.inject.extensions" % "guice-assistedinject" % "6.0.0",
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
)

addCommandAlias(
  "validateCode",
  "scalafmtSbtCheck; scalafmtCheckAll; uiCodeStyleCheck"
)
