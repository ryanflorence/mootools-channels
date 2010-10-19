/*
---

name: Channels

description: Mediate Element and Class events through the window. An expanded pattern for pub/sub.

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

authors: Ryan Florence

inspiration:
  - dojo.publish [docs](http://docs.dojocampus.org/dojo/publish)

requires:
  - Core/Class.Extras
  - Core/Element.Event

provides: [Channels]

...
*/

(function(){

var mediator = new Events

, methods = {

	createChannel: function(channel, eventName){
		Channels.publishing.push({publisher: this, channel: channel, event: eventName});
		this.addEvent(eventName, function(){
			mediator.fireEvent.apply(mediator, [channel].append(arguments));
		});
		return this;
	},
	
	createChannels: function(events){
		for (var channel in events) this.createChannel(channel, events[channel]);
		return this;
	},
	
	publishes: function(){
		return this['createChannel' + ((arguments.length == 1) ? 's' : '')].apply(this, arguments);
	},
	
	subscribeToChannel: function(channel, fn){
		Channels.subscriptions.push({subscriber: this, channel: channel});
		mediator.addEvent(channel, fn.bind(this));
		return this;
	},
	
	subscribeToChannels: function(events){
		for (var channel in events) this.subscribeToChannel(channel, events[channel]);
		return this;
	},
	
	subscribe: function(){
		return this['subscribeToChannel' + ((arguments.length == 1) ? 's' : '')].apply(this, arguments);
	}

}

, Channels = this.Channels = new Class(methods);

this.Element.implement(methods);

Object.append(Channels, {
	publishing: [],
	subscriptions: [],
	remove: function(channel){
		mediator.removeEvents(channel);
		Channels.publishing = Channels.publishing.filter(function(item){ 
			return item.channel != '/fx/start'
		});
	}
});

})();
