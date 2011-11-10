window.onload = function(){
  //test
  var canvasWidth = 1000
  var canvasHeight = 1000
  var paper = Raphael("notepad", canvasWidth, canvasHeight)
  //var conceptTreeString = "[=0=,=33=[=1=[=2=,=3=[=4=,=5=],=6=,=7=[=8=,=9=[=10=,=11=,=12=,=13=],=14=,=15=,=16=[=17=,=18=],=20=]]],=31=]"
  var conceptTreeString = "[=0=[=4=[=36=]],=33=[=1=[=2=,=3=[=4=[=35=],=5=],=15=,=20=]],=31=]"

// var concepts = getConceptList(conceptTreeString);
//  concepts.forEach(function(char, idx){})

  var nodeRadio = 20
  var nodesArray = []	
	var roots = getRoots(conceptTreeString)
  drawRoot(roots, paper, nodesArray, nodeRadio, canvasWidth)
	drawChildren(conceptTreeString, roots, paper, nodesArray, nodeRadio)
	drawChildren(conceptTreeString, roots, paper, nodesArray, nodeRadio)
}

function drawRoot(roots, paper, nodesArray, nodeRadio, canvasWidth){
  var _roots = Array.clone(roots)
  rootsLength = _roots.length
  var nodeYCoord = 25 //point that marks the begin of the node 
  if(rootsLength>0){
		//first node
		var firstNodeX = canvasWidth/2
		nodesArray.push(paper.circle(firstNodeX, nodeYCoord, nodeRadio))
		paper.text(firstNodeX, nodeYCoord+nodeRadio+5, _roots[0])

		if(rootsLength>1){
			_roots.shift()
			_roots.forEach(function(char, idx){
				if(idx%2 != 0){
					var nodeXCoord = firstNodeX+(parseInt(idx,10)+2)*(nodeRadio*5)-nodeRadio*2
					nodesArray.push(paper.circle(nodeXCoord, nodeYCoord, nodeRadio))
					paper.text(nodeXCoord, nodeYCoord+nodeRadio+5, char);
				}else{
					var nodeXCoord = firstNodeX-(parseInt(idx,10)+2)*(nodeRadio*5)
					nodesArray.push(paper.circle(nodeXCoord, nodeYCoord, nodeRadio))
					paper.text(nodeXCoord, nodeYCoord+nodeRadio+5, char);
				}
			})
		}
	}
	return nodesArray
}

function drawChildren(conceptTreeString, roots, paper, nodesArray, nodeRadio){
  var _roots = Array.clone(roots)
	roots = []
	var hasChildren = false

	//cria um novo nodesArray, que substituira o externo apos terminada a execucao da funcao em foco (esta!)
	var innerNodesArray = []
  _roots.each(function(rootChar, rootIdx){
		var children = getConceptChildrenList(conceptTreeString, rootChar)
		if(children.length>0){
		  //first node
			var nodeYCoord = nodesArray[rootIdx].attr().cy+nodeRadio*5
			if(children.length%2==0){
				var firstNodeX = nodesArray[rootIdx].attr().cx+nodeRadio*2
			}else{
				var firstNodeX = nodesArray[rootIdx].attr().cx
			}
			innerNodesArray.push(paper.circle(firstNodeX, nodeYCoord, nodeRadio))
			paper.text(firstNodeX, nodeYCoord+nodeRadio+5, children[0]) 
			paper.path("M"+nodesArray[rootIdx].attr().cx+" "+(nodesArray[rootIdx].attr().cy+nodeRadio+9)+"L"+firstNodeX+" "+(nodeYCoord-nodeRadio));
			roots.push(children[0])
			//verify if first node has children
			if(hasChildren==false && getConceptChildrenList(conceptTreeString, children[0]).length>0){
				hasChildren=true
			}

			if(children.length>1){
        children.shift()
				children.forEach(function(char, idx){ 
				  //verify if children has children
					if(hasChildren==false && getConceptChildrenList(conceptTreeString, char).length>0){
					  hasChildren=true
					}
					
				  if(idx%2 !=0){
						var nodeXCoord = firstNodeX+(parseInt(idx,10)+2)*(nodeRadio*2)-nodeRadio*2
						innerNodesArray.push(paper.circle(nodeXCoord, nodeYCoord, nodeRadio))
						paper.path("M"+nodesArray[rootIdx].attr().cx+" "+(nodesArray[rootIdx].attr().cy+nodeRadio+9)+"L"+nodeXCoord+" "+(nodeYCoord-nodeRadio));
						paper.text(nodeXCoord, nodeYCoord+nodeRadio+5, char);
						roots.push(char)
					}else{
						var nodeXCoord = firstNodeX-(parseInt(idx,10)+2)*(nodeRadio*2)
						innerNodesArray.push(paper.circle(nodeXCoord, nodeYCoord, nodeRadio))
						paper.path("M"+nodesArray[rootIdx].attr().cx+" "+(nodesArray[rootIdx].attr().cy+nodeRadio+9)+"L"+nodeXCoord+" "+(nodeYCoord-nodeRadio));
						paper.text(nodeXCoord, nodeYCoord+nodeRadio+5, char);
						roots.push(char)
					}
				})
		  }
		}
	})
	if(hasChildren){
		console.log("has children")
		drawChildren(conceptTreeString, roots, paper, innerNodesArray, nodeRadio)	
	}
}

function hasChildren(){

}

function drawAllChildren(parentConcept, paper, nodesArray, nodeRadio){
	children = getConceptChildrenList(parentConcept)
}
