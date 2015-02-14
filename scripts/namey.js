/** namey */
namey = {
	/*
			* Lightweight JSONP fetcher
			* Copyright 2010 Erik Karlsson. All rights reserved.
			* BSD licensed
			*/
	// Lightweight JSONP fetcher - www.nonobtrusive.com
	jsonP:(function(){var a=0,c,f,b,d=this;function e(j){var i=document.createElement("script"),h=false;i.src=j;i.async=true;i.onload=i.onreadystatechange=function(){if(!h&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){h=true;i.onload=i.onreadystatechange=null;if(i&&i.parentNode){i.parentNode.removeChild(i)}}};if(!c){c=document.getElementsByTagName("head")[0]}c.appendChild(i)}function g(h,j,k){f="?";j=j||{};for(b in j){if(j.hasOwnProperty(b)){f+=encodeURIComponent(b)+"="+encodeURIComponent(j[b])+"&"}}var i="json"+(++a);d[i]=function(l){k(l);try{delete d[i]}catch(m){}d[i]=null;};e(h+f+"callback="+i);return i}return{get:g}}()),

	get : function(options) {
		var callback;
		var tmp_params = {};
		var host = "namey.muffinlabs.com";
		//var host = window.location.host;

		if ( typeof(options) == "function" ) {
			callback = options;
		}
		else if ( typeof(options) == "object" ) {
			callback = options.callback;

			if ( typeof(options.host) !== "undefined" ) {
				host = options.host;
			}

			if ( typeof(options.count) == "undefined" ) {
				options.count = 1;
			}
			tmp_params.count = options.count;

			if ( typeof(options.type) != "undefined" && options.type != "both" ) {
				tmp_params.type = options.type;
			};

			if ( options.type != "surname" && typeof(options.with_surname) != "undefined" ) {
				tmp_params.with_surname = options.with_surname;
			}
			if ( options.min_freq ) {
				tmp_params.min_freq = options.min_freq;
				tmp_params.max_freq = options.max_freq;
			}
			else if ( typeof(options.frequency) != "undefined" ) {
				tmp_params.frequency = options.frequency;
			}

		}

		this.jsonP.get('//' + host + '/name.json', tmp_params, function(d) {
			if ( typeof(callback) == "function" ) {
				callback(d);
			}
			else {
				console.log(d);
			}
		});
	}
}
