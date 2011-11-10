;;abreviations:
;;c=con
;;m-con=main-con
;;con-t=concept-tree
;;ret=retrieve
;;mcraw=metacrawler
(ns conceptTree.web-search
  (:use [clojure.contrib.str-utils :only (str-join)]))

(defn fetch-url [address]
	(with-open [stream (.openStream (java.net.URL. address))]
		(let  [buf (java.io.BufferedReader.
			(java.io.InputStreamReader. stream))]
			(apply str (line-seq buf)))))

(defn ret-links-from-mcraw-for-con [m-con]
	(let [compl "is+a"]
		(re-seq #"(?<=<a class=\"resultTitle\" data-icl-coi=\"540\" data-icl-cop=\"results-main\" href=\")(.*?)(?= target=\"_blank\"\>)" 
  		(fetch-url (str "http://www.metacrawler.com/info.metac.test.c11/search/web?fcoid=485&fpid=1&qexact=" m-con compl "&qlang=en")))))

(defn ret-con-t-from-mcraw-links-for-con [m-con]
  (for [link (ret-links-from-mcraw-for-con m-con)]
		(let [inner-link (nth (.split (nth link 0) "ru=") 1) unallowed-symbols ",|\\.|:|;|_|+|=|&|#|$|%|!|@"]
			(re-seq
				(java.util.regex.Pattern/compile (str "(?<=" m-con " is a " ")(.*?)(?=[" unallowed-symbols "])") java.util.regex.Pattern/CASE_INSENSITIVE)
				(fetch-url
					(java.net.URLDecoder/decode
						(nth (.split inner-link "&amp") 0)))))))

(defn create-con-t-str [m-con]
  (map #(str "=" (nth (nth %1 0) 0) "=") (ret-con-t-from-mcraw-links-for-con m-con)))

;;(use '[clojure.contrib.str-utils :only (str-join)])
(defn wrap-con-t [m-con]
  (str "[=" m-con "=[" (str-join \, (create-con-t-str m-con)) "]]"))

(defn make-con-t-for-con [m-con]
  (wrap-con-t m-con))
