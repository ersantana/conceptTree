String.prototype.toCharArray = function(){
  var result = [];
	for(var i = 0, length = this.length; i < length; i++) {
		result.push(this.charAt(i));
	}
	return result;
}

//enviar o valor do campo input pra link main_concept
window.addEvent('domready',function() {
	$("go").addEvent("click",function(){
		alert("testing");
		window.location = "/search/"+$("main_concept").value;
	})
})
