define(['backbone','underscore','links/link','libs/backbone-localstorage'],function(Backbone,_,link,storage){
	var linkModels = Backbone.Collection.extend({
		model: link,
		localStorage: new storage('links')
	});
	
	return linkModels;
});