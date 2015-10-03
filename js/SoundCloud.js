var SoundCloudWidget = {
	initialize: function(callback) {
		//initialize SoundCloud
		SC.initialize({
			client_id: '1d19960b11e99ca9b95fe9e2c026ceac'
		});
		var iframe_url = 'https://w.soundcloud.com/player/?url=https://soundcloud.com/moor3_music&auto_play=false&buying=false&liking=true&download=false&sharing=true&show_artwork=false&show_comments=true&show_playcount=true&show_user=false&hide_related=true&visual=false&start_track=0&callback=true';

		//create the iframe
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", "scWidget");
		iframe.setAttribute("width", "100%");
		iframe.setAttribute("height", "auto");
		iframe.setAttribute("scrolling", "no");
		iframe.setAttribute("frameborder", "no");
		iframe.setAttribute("src", iframe_url);
		this.element.appendChild(iframe);
		
		//indentify the widget
		$("#scWidget").load(this.loadWidget(function(response) {
			if (callback)
				callback(response);
		}));
	},
	loadWidget: function(callback) {
		this.widget = SC.Widget("scWidget");
		
		//event listeners
		this.widget.bind(SC.Widget.Events.READY, function() {
			$("#scPlayer #scControls .open i").css("cursor", "pointer"); //pointer cursor when loaded
			console.info("widget is ready", SoundCloudWidget);
			SoundCloudWidget.loadCookie(); //check for cookies
			SoundCloudWidget.widget.setVolume(0.75); //set volume to 75%
			if (callback)
				callback(SoundCloudWidget.widget); //execute callback with widget
		});
		this.widget.bind(SC.Widget.Events.PLAY, function() {
			$("#scPlayer #scControls .open i").css("cursor", "progress"); //progress cursor when playing
			$("#scPlayer #scControls .volume").fadeIn("slow"); //show volume when playing
		});
		this.widget.bind(SC.Widget.Events.PAUSE, function() {
			$("#scPlayer #scControls .open i").css("cursor", "pointer"); //pointer cursor when pause
			$("#scPlayer #scControls .volume").fadeOut("slow"); //hide volume when pause
		});
	},
	element: document.getElementById("scEmbed"),
	widget: {},
	toggleVisibility: function(state) { //toggle widget visibility
		if (state === true && $(this.element).is(":visible")) {
			
		} else if (state === false && $(this.element).is(":hidden")) {
				   
		} else {
			$(this.element).slideToggle("slow", function() {
				$("#scPlayer #scControls .expend").fadeToggle();
			});
		}
	},
	toggleExpend: function(state) { //toggle expend of the widget
		$("#scPlayer #scEmbed #scWidget").toggleClass("extend", 1000);
		$("#scPlayer #scControls .expend i").toggleClass("fa-compress");
		$("#scPlayer #scControls .expend i").toggleClass("fa-expend");
		if (state === true) {
			$("#scPlayer #scEmbed #scWidget").addClass("extend", 1000);
			$("#scPlayer #scControls .expend i").removeClass("fa-expend");
			$("#scPlayer #scControls .expend i").addClass("fa-compress");
		} else if (state === false) {
			$("#scPlayer #scEmbed #scWidget").removeClass("extend", 1000);
			$("#scPlayer #scControls .expend i").addClass("fa-expend");
			$("#scPlayer #scControls .expend i").removeClass("fa-compress");
		}
	},
	setVolume: function(volume) {
		this.widget.setVolume(volume);
	},
	play: function() {
		this.widget.play();
		this.toggleVisibility(true);
	},
	saveCookie: function(callback) {
		var string = "";
		var check = 0;
		function setCookie() {
			if (check == 4) {
				document.cookie = "(SoundCloud)" + string;
				if (callback)
					callback("(SoundCloud)" + string);
			}
		}
		this.widget.getCurrentSoundIndex(function(response) {
			string += "soundIndex:" + response + "&";
			check++;
			setCookie();
		});
		this.widget.getPosition(function(response) {
			string += "position:" + response + "&";
			check++;
			setCookie();
		});
		this.widget.isPaused(function(response) {
			string += "isPaused:" + response + "&";
			check++;
			setCookie();
		});
		this.widget.getVolume(function(response) {
			string += "volume:" + response;
			check++;
			setCookie();
		});
	},
	loadCookie: function() {
		var cookies = document.cookie;
		var cookies = cookies.replace("(SoundCloud)", "");
		var dataArray = cookies.split("&");
		for (var i = 0; i < dataArray.length; i++) {
			var pair = dataArray[i].split(":");
			if (pair[0] == "soundIndex")
				this.widget.skip(pair[1]);
			else if (pair[0] == "position") {
				this.seekTo(pair[1]);
			} else if (pair[0] == "isPaused")
				if (pair[1] != "true") {
					this.widget.play();
					this.toggleVisibility();
				} else
					this.widget.pause();
			else if (pair[0] == "volume")
				this.widget.setVolume(pair[1]);
			
		}
	},
	seekTo: function(pos) {
		this.widget.bind(SC.Widget.Events.PLAY,function(){
			SoundCloudWidget.widget.seekTo(pos);
			SoundCloudWidget.widget.unbind(SC.Widget.Events.PLAY);
			SoundCloudWidget.widget.bind(SC.Widget.Events.PLAY, function() {
				$("#scPlayer #scControls .open i").css("cursor", "progress"); //progress cursor when playing
				$("#scPlayer #scControls .volume").fadeIn("slow"); //show volume when playing
			});
		});
	}
};

SoundCloudWidget.initialize(function() {
	console.log("widget data inited", SoundCloudWidget);
});

//volume hover show the slider
$("#scPlayer #scControls .volume").hover(function() {
	$("#scVolume").stop().animate({
		width: 300,
		opacity: 1
	}, 300);
}, function() {
	$("#scVolume").stop().delay(600).animate({
		width: 0,
		opacity: 0
	}, 300);
});

//volume slider
$("#scVolume").slider({
    min: 0,
    max: 100,
    value: 75,
	step: 1,
	slide: function(event, ui) {
		 SoundCloudWidget.setVolume(ui.value / 100);
	} 
});

window.onbeforeunload = closingCode;
function closingCode(){
	SoundCloudWidget.saveCookie();
}

function initSoundCloudWidget() {
	
}