/*
---

name: Channels

description: Mediate Class events. An expanded pattern for pub/sub.

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

authors: Ryan Florence

inspiration:
  - dojo.publish [docs](http://docs.dojocampus.org/dojo/publish)

requires:
  - Core/Class.Extras

provides: [Channels]

...
*/

(function(){

var mediator = new Events,

	methods = {
		publishes: function(eventName, channel){
			if (typeOf(channel) === 'array'){
				channel.each(function(channel){ this.publishes(eventName, channel); }, this);
				return;
			}
			Channels.publishing.push({publisher: this, channel: channel, event: eventName});
			this.addEvent(eventName, function(){
				mediator.fireEvent.call(mediator, channel, arguments);
			});
			return this;
		}.overloadSetter(), // not public MooTools

		subscribe: function(channel, fn){
			Channels.subscriptions.push({subscriber: this, channel: channel});
			mediator.addEvent(channel, fn.bind(this));
			return this;
		}.overloadSetter()
	},

	Channels = this.Channels = new Class(methods);

Object.append(Channels, {
	publishing: [],
	subscriptions: [],
	remove: function(channel){
		mediator.removeEvents(channel);
		Channels.publishing = Channels.publishing.filter(function(item){ 
			return item.channel != channel;
		});
	},
	installTo: function(obj){
		obj.implement(methods);
	}
});

})();
