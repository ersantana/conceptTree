(ns conceptTree.core
	(:gen-class :extends javax.servlet.http.HttpServlet)
	(:use net.cgrand.moustache, conceptTree.web-search
	  [clojure.contrib.str-utils :only (str-join)]
		[ring.util.servlet   :only [defservice]]
		net.cgrand.enlive-html
		[net.cgrand.moustache :only (app pass)]
		[ring.middleware.file :only (wrap-file)]
		ring.util.response
		ring.middleware.params))

(deftemplate index "resources/templates/index.html" [])

(deftemplate search "resources/templates/index.html"
  [concept]
	;;[:div#conceptTreeStr] (content (make-con-t-for-con concept)))
	[:div#conceptTreeStr] (content (retrieve-concept-tree-metacrawler concept)))

(def my-app-handler
	(app 
	  wrap-params
    ["static" &] {:get  [(wrap-file "resources/static/") pass]}
		[""] {:get  (-> (index) response constantly)}
		["search" concept] {:get (-> (search concept)response constantly)}
		[&]          {:any  (-> (str "404 Page not be found") response constantly)}))

(defservice my-app-handler)
