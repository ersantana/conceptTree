(defproject conceptTree "1.0.0-SNAPSHOT"
  :description "FIXME: write"
  :dependencies [[net.cgrand/moustache "1.0.0-SNAPSHOT"]
    [appengine "0.4.3-SNAPSHOT"]
    [enlive  "1.0.0-SNAPSHOT"]]
  :dev-dependencies [[ring "0.3.11"]
    [lein-ring "0.4.5"]]
   :aot [conceptTree.core]
   :compile-path "war/WEB-INF/classes"
   :library-path "war/WEB-INF/lib")
