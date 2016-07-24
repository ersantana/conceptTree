(defproject conceptTree "1.0.0-SNAPSHOT"
  :description "FIXME: write"
  :dependencies [[net.cgrand/moustache "1.0.0-SNAPSHOT"]
                 [ring-jetty7-adapter "0.3.8"]
                 [enlive  "1.0.0-SNAPSHOT"]]
  :dev-dependencies [[ring "0.3.11"]
                     [lein-ring "0.4.5"]]
   :aot [conceptTree.core]
  :main conceptTree.core
   :compile-path "war/WEB-INF/classes"
   :library-path "war/WEB-INF/lib")
