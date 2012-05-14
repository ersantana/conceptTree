(ns conceptTree.web-search
	(:use [clojure.contrib.str-utils :only (str-join)]))

(defn fetch-url
	"returns the content of a web page as a string"
	[address]
	(with-open [stream (.openStream (java.net.URL. address))]
		(let  [buf (java.io.BufferedReader.
			(java.io.InputStreamReader. stream))]
			(apply str (line-seq buf)))))

(defn retrieve-links
	"make a search using the metacrawler search engine and returns a list with the links from the search's result"
	[m-con]
	(let [compl "is+a"]
		(re-seq #"(?<=<a class=\"resultTitle\" data-icl-coi=\"540\" data-icl-cop=\"results-main\" href=\")(.*?)(?= target=\"_blank\"\>)" 
		(fetch-url (str "http://www.metacrawler.com/info.metac.test.c11/search/web?fcoid=485&fpid=1&qexact=" m-con compl "&qlang=en")))))

(defn build-concept-tree
	"reads the content of all the pages from the links"
	[m-con]
	(for [link (retrieve-links m-con)]
		(let [inner-link (nth (.split (nth link 0) "ru=") 1) unallowed-symbols ",|\\.|:|;|_|+|=|&|#|$|%|!|@"]
			(re-seq
				(java.util.regex.Pattern/compile (str "(?<=" m-con " is a " ")(.*?)(?=[" unallowed-symbols "])") java.util.regex.Pattern/CASE_INSENSITIVE)
				(fetch-url
					(java.net.URLDecoder/decode
						(nth (.split inner-link "&amp") 0)))))))

(defn create-concept-tree-str [m-con]
	(map #(str "=" (nth (nth %1 0) 0) "=") (build-concept-tree m-con)))

(defn wrap-concept-tree [m-con]
	(str "[=" m-con "=[" (str-join \, (create-concept-tree-str m-con)) "]]"))

(defn make-concept-tree [m-con]
	(wrap-concept-tree m-con))
