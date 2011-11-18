define(['jquery','backbone','scripts/favsView'],function($,Backbone,favsView){
	var homeRouter = Backbone.Router.extend({
		initialize: function(){
			Backbone.history.start();
		},
		routes: {
			'': 'home'
		},
		'home': function(){
			favsView.render();
		}
	});
	
	return new homeRouter();
});