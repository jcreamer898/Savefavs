define(['jquery','backbone','underscore','scripts/links','scripts/linkView'], function($, Backbone,_,links,linksView){
	var favsView = Backbone.View.extend({
		el: '#main',
		events: {
			//'blur #save_links': 'addLink'
			'keyup #save_links': 'addLink'
		},
		initialize: function(){
			this.URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			this.collection = new links();
			this.collection.bind('add', this.renderLink, this);
			this.collection.bind('reset', this.renderAll, this);
			this.validateMessage = $("#validate_link",this.el);
			
			this.collection.fetch();
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
				.fadeIn("fast");
			
			model.save();
		},
		render: function(){
			console.log("Ready...");
		}
	});
	
	return new favsView;
});