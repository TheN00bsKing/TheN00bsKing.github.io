var oInnerFrame;
var oFlash;
var firstRun = false;

function gotoPage(sURL, sTarget){
	switch(sTarget){
		case "inner_frame":
			oInnerFrame.src = sURL;
		break;
		case "_blank":
			window.open(sURL);
		break;
	}
		
}
function refreshInnerFrame(nHeight){
	var homeURL = "http://www.red-sub.co.il/";
	oInnerFrame = document.getElementById("oInnerFrame");
	var url = window.location.href;
	if(oInnerFrame == null){
		var arr = url.split("red-sub.co.il/");
		var page = arr[arr.length - 1];
		window.location = homeURL+"?page="+page;
	}else{
		if(!firstRun){
			firstRun = true;
			var params = url.split("page=");
			if(params.length > 1){
				var pageParam = params[params.length - 1];
				if(oInnerFrame.src != pageParam)
					oInnerFrame.src = pageParam;
			}
		}
		if(nHeight < 200)
			nHeight = 200;
		oInnerFrame.height = nHeight;
	}
	//_uacct = "UA-4032289-1";
	_uacct = "UA-4186368-1";
	urchinTracker();
}

function getCurrentHeight(){
	return document.body.scrollHeight;
}

function createGallery(arr, cols){
	var str = "";
	str += '<TABLE align="center" cellspacing="15">';
	
	for(var x = 0 ; x < arr.length ; x++){
		if(x % cols == 0){
			if(x > 0){
				str += "</TR>";
			}
			str += "<TR>";
		}
		str += '<TD>';
		str += '<TABLE align="center">';
		str += '</TR>';
		str += '<TD><A HREF="'+arr[x].url+'" target="_blank"><IMG SRC="'+arr[x].file+'" BORDER="0" ALT=""></a></TD>';
		str += '</TR>';
		str += '<TR>';
		str += '<TD width="130" align="center"><A HREF="bands/mia.html" class="bandlink"></TD>';
		str += '<TR>';
		str += '</TABLE>';
		str += '</TD>';
	}
	str += '</TR></TABLE>';
	document.write(str);
}

function createImageArray(from, to, name){
	var arr = new Array();
	for(var x = from ; x <= to; x ++){
		var file_str = "../images/gallery/"+name+"/small/"+x+".jpg";
		var url_str = "../images/gallery/"+name+"/big/"+x+".jpg";
		arr.push({file:file_str, url:url_str });
	}
	return arr;
}

function traceFlash(s){
	alert(s);
}

function selectSongByID(s){
	top.oFlash.selectSongByID(s);
}