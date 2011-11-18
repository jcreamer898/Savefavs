define(['jquery','backbone','underscore','scripts/link'],function($,Backbone,_,link){
	var linkModels = Backbone.Collection.extend({
		model: link
	});
	
	return linkModels;
});