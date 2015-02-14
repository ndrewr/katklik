
function Kat(given_name) {
	var self = this;

	if(given_name)
		self.name = given_name;
	else
		namey.get(function(data) {
			self.name = data[0];
		});

	self.klikcount = ko.observable(0);
}

function KlikKatViewModel() {
	var self = this;

	// kats...yup can be more than one...
	self.kats = ko.observableArray([
		new Kat("Feenie"),
		new Kat("Pearls")
	]);

	self.spawnKat = function() {
		namey.get(function(data) {
			var new_name = data[0];
			console.log("spawning kat...named %s. Total cats previously %s", new_name, self.kats().length);
			self.kats.push(new Kat(new_name));
		});
	}

	self.counterUp = function(kat) {
		console.log("counter up for kat...%O", kat );
		var current_count = kat.klikcount();
		kat.klikcount(current_count+1);
	}

	self.allUp = function() {
		console.log("Updating counters...for total cats %s", self.kats().length);
		for(i=0; i < self.kats().length; i++) {
			var current_count = self.kats()[i].klikcount();
			self.kats()[i].klikcount(current_count+1);
		}
	}
}

ko.applyBindings(new KlikKatViewModel());
