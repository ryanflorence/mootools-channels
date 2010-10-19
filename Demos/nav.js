var Nav = new Class({

	Implements: [Options, Events],
	
	options: { 
		childTag: 'a',
		currentClass: 'current'
	},
	
	initialize: function(element, options){
		this.setOptions(options);
		this.element = document.id(element);
		this.current = null;
		this.attach();
	},

	attach: function(){
		this.element.addEvent('click', function(event){
			this.navClick.apply(this, [event.target]);
		}.bind(this));
	},

	navClick: function(target){
		if (target == this.current) return;
		if (this.current) this.current.removeClass(this.options.currentClass);
		this.current = target.addClass(this.options.currentClass);
		this.fireEvent('click', target);
	}

});
