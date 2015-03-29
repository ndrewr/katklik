
function Kat(given_name) {
	var self = this;

	if(!given_name)
		namey.get(function(data) { given_name = data[0]; });
	self.name = ko.observable(given_name);
	self.klikcount = ko.observable(0).extend({ notify: 'always' });;
//	self.klikcount.extend({ notify: 'always' });
}

function KlikKatViewModel() {
	var self = this;
	self.admin_mode = ko.observable(false);
	self.chosen_cat = ko.observable(0); // keep track of selected kitty
	self.current_kat = ko.observable();

	// kats...yup can be more than one...
	self.kats = ko.observableArray([
		new Kat("Feenie"),
		new Kat("Pearls")
	]);
	self.current_kat(self.kats()[0]);
	self.name = ko.computed(function() {
		return self.kats()[self.chosen_cat()].name();
	});

//	self.klikcount = ko.observable(0);
	self.klikcount = ko.computed(function() {
		return self.kats()[self.chosen_cat()].klikcount();
	});

	self.katrank = ko.computed(function() {
		return (self.klikcount() < 5)? "Novice" : (self.klikcount() > 10)? "Master" : "Pro";
	});



	self.selectKat = function(index, kat, event) {
		console.log("Chosen kat is %s", index);
		self.chosen_cat(index);

		var chosen_cat_count = self.kats()[self.chosen_cat()].klikcount();
		self.kats()[self.chosen_cat()].klikcount(chosen_cat_count);
//		self.klikcount(kat.klikcount());
	}

	self.spawnKat = function() {
		namey.get(function(data) {
			var new_name = data[0];
			console.log("spawning kat...named %s. Total cats previously %s", new_name, self.kats().length);
			self.kats.push(new Kat(new_name));
		});
	}

//	self.counterUp = function(kat) {
//		console.log("counter up for kat...%O", kat );
//		var current_count = kat.klikcount();
//		kat.klikcount(current_count+1);
//	}

	self.counterUp = function() {
		var chosen_cat_count = self.kats()[self.chosen_cat()].klikcount();
		self.kats()[self.chosen_cat()].klikcount(chosen_cat_count + 1);
//		self.klikcount(self.klikcount()+1);
	}

	self.allUp = function() {
		console.log("Updating counters...for total cats %s", self.kats().length);
		for(i=0; i < self.kats().length; i++) {
			var current_count = self.kats()[i].klikcount();
//			if(i === chosen_cat) self.klikcount(self.klikcount() + 1);
//			else
			self.kats()[i].klikcount(current_count+1);

		}
	}

	self.toggleAdmin = function() {
			self.admin_mode(!self.admin_mode());
	}

	self.hideAdmin = function() {
		self.admin_mode(false);
	}

	self.modifyKat = function(formElement) {
		console.log("Modifying Kat! Element is %O", formElement);
		console.log("values are %s and %s", formElement.elements["name"].value, formElement.elements["klikcount"].value);

		var form_elements = formElement.elements;
		self.kats()[self.chosen_cat()].name( form_elements["name"].value);
		self.kats()[self.chosen_cat()].klikcount(form_elements["klikcount"].value);
		self.toggleAdmin();

	}

}

ko.applyBindings(new KlikKatViewModel());
