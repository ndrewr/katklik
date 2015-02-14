/*
	* Cat Clicker project for Udacity Javascript Design Patterns course
	* Author: Andrew Roy Chen, February 11, 2015
	*
	*/

// temp globals for common graphics
var spritegrid = [{x:0,w:32}, {x:30,w:32}, {x:63,w:32}, {x:94,w:40}, {x:134,w:44}];
var img = new Image();
img.addEventListener("load", function() {
	console.log("Booting up view model!");
	ko.applyBindings(new KlikKatViewModel());
}, false);
img.src = '../app/images/psyduck_sprite.png';

// Kat data object
function Kat(given_name) {
	var self = this;

	self.name = ko.observable();
	if(given_name)
		self.name(given_name);
	else
		namey.get(function(data) {
			self.name(data[0]);
		});

	self.klikcount = 0;
	self.kat_state = 0;
	self.ctx;
}

function KlikKatViewModel() {
	var self = this;
	var $canvas = $('canvas');
	var $btn = $('#klikbtn');

//	var kat_state =0;
	var cooldownTimer;

//	self.klikcount = ko.observable(1);
//	self.name = ko.observable();
//	namey.get(function(data) {
//		self.name(data[0]);
//	});

	// kats...yup can be more than one...
	self.kats = ko.observableArray([
							new Kat("Feenie"),
							new Kat("Pearls")
	]);

	self.spawnKat = function() {
		//create canvas element, get context, draw scene
		//create counter element
		//append all within container to page

//		var c = document.createElement('canvas');
//		c.width = 90;
//		c.height = 90;
//		$('#catbox').append(c);
//		var ctx = c.getContext('2d');
//		drawSprite(ctx);

		// OK so I basially want to push a new kat to observable
		// array...the event causes KO to auto-update, then I
		// get the ref to newly made canvas ref, get context
		// and set the newly added kat's ctx prop.
		// then call drawsprite
		var newlength = self.kats().push(new Kat());
		//var ctx = $canvas.last().getContext('2d');
		//self.kats()[newlength-1].ctx = ctx;
		//drawSprite(ctx);
	}


	//load canvas context, create img ref, draw to screen
//	var ctx = $canvas.get(0).getContext('2d');
//	ctx.drawImage(img,
//								0, 0,
//								spritegrid[0].w, 46,
//								10, 0,
//								(spritegrid[0].w*2), 92);

	//handle click event on button to increment counter
	self.counterUp = function(e) {
		var clickedKat = self.kats()[e.target];

		var count = self.klikcount();
		self.klikcount(count + 1);

		clearTimeout(cooldownTimer);

		kat_state = (kat_state + 1) % 5;

		if(kat_state) {
				cooldownTimer = setTimeout(function() {
					chillOut();
				}, 5000);
		}

		drawSprite(ctx); //must pass in specific ctx
	};

	function chillOut() {
		kat_state--;
		drawSprite();
		if(kat_state) {
			cooldownTimer = setTimeout(chillOut, 5000);
		}
	}

	function drawSprite(ctx) {
		ctx.clearRect (0 , 0 , 90, 90);
		ctx.drawImage(img,
									spritegrid[kat_state].x, 0,
									spritegrid[kat_state].w, 46,
									10, 0,
									(spritegrid[kat_state].w*2), 92);
	}
}
