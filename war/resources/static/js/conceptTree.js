var wordDelimiter = "="

function getConceptList(conceptTreeString){
  var status = 0;
  var char = '';
  var word = '';
  var conceptArray = []
  for(var index=0;index<conceptTreeString.length;index++){
    char = conceptTreeString.charAt(index);
    if(char=="=" && status!=1){status =1;continue;}
    if(char=="=" && status==1){conceptArray.push(word);word='';status=0;continue;}
    if(status==1){word+=char}
  }
  return conceptArray;
}

function getRoots(conceptTreeString){                   
	return getSameLevelConcepts(conceptTreeString.substring(1,conceptTreeString.length))
}

function getConceptChildrenList(conceptTreeString, parentConcept){
  var conceptTreeString = conceptTreeString.split("="+parentConcept+"=")[1];
  var childrenArray = [];

  if(conceptTreeString[0]=="["){
		childrenArray = getSameLevelConcepts(conceptTreeString.substring(1))
  }
  return childrenArray
}

function takeOffWordDelimiter(conceptTreeString){
  var regx = new RegExp(wordDelimiter, "g");
  return conceptTreeString.replace(regx, "")
}

function insertWordDelimiter(conceptTreeString){
  result = conceptTreeString.replace(/,/g,wordDelimiter+","+wordDelimiter)
  result = result.replace(/]=/g,wordDelimiter+"=]")
  return result.replace(RegExp("[","g"),wordDelimiter+"=[=")
}

function getSameLevelConcepts(conceptTreeString){
  var conceptArray = []
	//status - 0=normal;1=incomplete word;2=inside inner structure                                       
	var status = 0;
	var char = '';                                                                                       
	var word = '';  
	for(var index=0;index<conceptTreeString.length;index++){                                                            
		char = conceptTreeString.charAt(index);
	
		//ignore commas                                                                                    
		if(char==","){                                                                                     
			continue;                                                                                        
		}
	
		//inner structure, change status and start ignoring chars until the inner structure is closed      
		if(char=="["){                                                                                     
			status+=2;                                                                                       
			continue;
		}
		if(status>=2 && char=="]"){                                                                        
			status-=2;                                                                                       
			continue;                                                                                        
		}
	
		//ignore all chars when within status2                                                             
		if(status>=2){continue;}
	
		//if not in status >2 && find symbol "]" end the process                                           
		if(char=="]" || status<0){break;}
	
		//se tudo estiver legal adiciona a word ao array                                                   
		if(char=="=" && status!=1){                                                                        
			status=1;                                                                                        
			continue;                                                                                        
		}

		if(char=="=" && status==1){                                                                        
			conceptArray.push(word);                                                                        
			word='';                                                                                         
			status=0;                                                                                        
			continue;                                                                                        
		}
		
		if(status==1){                                                                                     
			word+=char;                                                                                      
		}                                                                                                  
	}

	return conceptArray
}
