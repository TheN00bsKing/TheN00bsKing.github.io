function getXMLData(URL, callback, debug) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//track the loading states
	xmlhttp.onreadystatechange = function() {
		var state = xmlhttp.readyState;
		var status = xmlhttp.status;
		if (debug) {
			console.log(URL + " loading state is: " + state);
			if (status == 404)
				console.log(URL + " Not Found");
		}
		if (xmlhttp.readyState == 4 && status == 200) {
			callback(xmlhttp.responseXML); // execute callback;
			console.info(URL + " callback has execute");
		} else if (debug) {
			console.warn("callback didnt execute (status: " + status + ")");
		}
	}
	xmlhttp.open("GET", URL, true);
	xmlhttp.send();
}