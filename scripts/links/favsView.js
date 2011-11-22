define(['jquery',
		'backbone',
		'underscore',
		'links/links',
		'links/linkView',
		'jqueryui/draggable',
		'jqueryui/droppable',
		'jqueryui/effects/core'], function($, Backbone,_,links,linksView,draggable){
	var favsView = Backbone.View.extend({
		el: $('#main'),
		events: {
			//'blur #save_links': 'addLink'
			'keyup #save_links': 'addLink'
		},
		initialize: function(){
			var self = this;
			this.URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			this.collection = new links();
			
			this.collection.bind('add', this.renderLink, this);
			this.collection.bind('reset', this.renderAll, this);
			this.validateMessage = $("#validate_link",this.el);
			
			_.bindAll(this, 'renderLink', 'renderAll', 'removeFav');
			
			this.collection.fetch();
			
			this.trash = $("#trash", this.el).droppable({
				drop: function(event, ui){
					self.removeFav($.trim(ui.helper.html()));
				}
			});
			
			this.$("input").show('fast');
		},
		'addLink': function(event){
			var url = $(event.currentTarget).val()
				linkInput = $(event.currentTarget);
			
			if(this.collection.any(function(link){
					return link.get('url') === url
				})){
					linkInput.css('border-color','red');
					this.validateMessage.html('This url already exists');
					return this;
			}
			else{
				this.validateMessage.html('');
				linkInput.css('border-color','#eaeaea');
			}
			
			if(event.keyCode == 13){
				if(!url.match(this.URL_REGEX)){
					linkInput.css('border-color','red')
					this.validateMessage.html('This url is invalid');
					return this;
				}
				else{
					this.validateMessage.html('');
					linkInput.css('border-color','#eaeaea')
						.val('');
					
					this.collection.add({ url: url  });
				}
			}
		},
		renderAll: function(){
			this.collection.each(
				this.renderLink
			);
		},
		renderLink: function(model){
			var view = new linksView({ model: model});
			
			$(view.el).hide()
				.appendTo($("#links",this.el))
				.fadeIn("fast")
				.draggable({
					revert: true
				});
			
			model.save();
			
			if(this.collection.length > 0){
				$("#trash",this.el).slideDown("slow", 'easeOutBounce');
			}
		},
		render: function(){
			console.log("Ready...");
		},
		removeFav: function(name){
			var link = this.collection.find(function(fav){
				return fav.get('url') == name;
			});
			
			if(typeof link !== 'undefined'){
				link.destroy();
			}
			
			if(this.collection.length <= 0){
				$("#trash",this.el).slideUp("slow", 'easeOutBounce');
			}
		}
	});
	
	return new favsView;
});