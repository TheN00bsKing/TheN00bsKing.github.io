function createFlashObject(oFlash){
	if(oFlash["movie"] == null){
		alert("flashutils > createFlashObject > wrong values");
	}
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+oFlash["width"]+'" height="'+oFlash["height"]+'" id="'+oFlash["id"]+'" align="middle">');
	for(var x in oFlash){
		document.write('<param name="'+x+'" value="'+oFlash[x]+'" />');
	}
	document.write('<embed src="'+oFlash["movie"]+'" quality="high" bgcolor="#ffffff" width="'+oFlash["width"]+'" height="'+oFlash["height"]+'" name="main" align="middle" allowScriptAccess="'+oFlash["allowScriptAccess"]+'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write('</object>');
	//alert(document.getElementById(oFlash["id"]));
	return document.getElementById(oFlash["id"]);
}