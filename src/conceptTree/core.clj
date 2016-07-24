(ns conceptTree.core
 (:require
    [net.cgrand.enlive-html :refer :all]
    [ring.util.response :refer :all]
    [ring.middleware.params :refer :all]
    [ring.adapter.jetty7 :as ring]
    [net.cgrand.moustache :refer [app pass]]
    [ring.util.servlet   :refer [defservice]]
    [conceptTree.web-search :as s]
    [clojure.contrib.str-utils :refer [str-join]]
    [ring.middleware.file :refer [wrap-file]]))

(deftemplate index "templates/index.html" [])

(deftemplate search
	"templates/index.html"
	[concept]
	[:div#conceptTreeStr] (content (s/make-concept-tree concept)))

(def handler
	(app wrap-params
		   ["static" &]       {:get [(wrap-file "resources/public") pass]}
		   [""] {:get         (-> (index) response constantly)}
		   ["search" concept] {:get (-> (search concept) response constantly)}
		   [&]                {:any (-> (str "404 Page not be found") response constantly)}))

(defn start [port]
  (ring/run-jetty (var handler) {:port port
                                 :join? false}))

(defn safe-parse [n]
  (when n (Integer/parseInt n)))

(defn -main []
  (let [port (safe-parse (System/getenv "PORT"))]
    (start (or port 8080))))
