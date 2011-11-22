require.config({ 
    'paths': { 
		"underscore": "libs/underscore", 
		"backbone": "libs/backbone",
		"jqueryui": 'libs/jqueryui-1.8.14/jqueryui/',
		"jqueryui/draggable": 'libs/jqueryui-1.8.14/jqueryui/draggable',
		"jqueryui/droppable": 'libs/jqueryui-1.8.14/jqueryui/droppable',
		'jqueryui/effects/core': 'libs/jqueryui-1.8.14/jqueryui/effects/core'
	}
}); 

require([
	'order!libs/underscore',
	'order!libs/backbone',
	'order!app'
	], 
	function(_,Backbone,app){
		app.init();
});