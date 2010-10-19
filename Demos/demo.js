var nav, el;

document.addEvent('domready', function(){
	
// could just use `Implements` mutator
// but most classes already exist w/o Channels
Nav.implement(Channels.prototype);

// create two objects
nav = new Nav('nav')
el = document.getElement('div');

// map an object's own events to a channel
// when the object fires it's own event
// it relays that to the mediator and "publishes"
// or, in other words, fires an event.
nav.publishes('/nav/click', 'click');

// subscribe to a channel
el.subscribe('/nav/click', function(target){ 
	// context is the subscribing object
	this.set('class', target.get('class'))
}).publishes('/el/hover', 'mouseenter');

$(document.body).subscribe('/el/hover', function(event){
	console && console.log(event);
	this.highlight();
});
 
/*
// MooTools already has "pub/sub" with its custom events.

var semantics = {
	'publish'    : 'fireEvent',
	'subscribe'  : 'addEvent',
	'unsubscribe': 'removeEvents'
};

// "subscribing" is simply adding an event to the mediator (window)
window.addEvent('/nav/click', function(target){
	el.toggleClass(target.get('class'));
});

nav.addEvent('click', function(target){
	// "publishing" is simply firing an event on the mediator (window)
	window.fireEvent('/nav/click', target);
});

// "unsubscribing" is simply removing the events
// window.removeEvents('/nav/click');

// if you store a function, you can remove only one "subscription"
// window.removeEvent('/nav/click', fn);

*/

});