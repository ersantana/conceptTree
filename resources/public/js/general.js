String.prototype.toCharArray = function(){
  var result = [];
	for(var i = 0, length = this.length; i < length; i++) {
		result.push(this.charAt(i));
	}
	return result;
}
