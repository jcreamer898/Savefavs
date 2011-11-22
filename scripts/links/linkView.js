define(['jquery','backbone','underscore'],function($,Backbone,_){
	var linkView = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			this.template = _.template($("#linksTemplate").html());
			this.render();
			this.model.bind('destroy', this.destroy, this);
		},
		render: function(){
			var html = this.template(this.model.toJSON());
			$(this.el).html(html);
		},
		destroy: function(){
			$(this.el).fadeOut('fast', function(){
				$(this).remove();	
			});
		}
	});
	
	return linkView;
});