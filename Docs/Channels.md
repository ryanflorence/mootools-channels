Class: Channels {#Channels}
===========================

Relay an object's events to a mediator `Events` object, allowing other objects to subscribe to the events. This allows you to describe everything about an object, including its response to events in the application, in one place.  This is simply an alternative pattern you may find helpful when organizing your code.  It extends upon the traditional "pub/sub" pattern already existent in MooTools.

Implement Channels into new classes with `Implements`, or install to existing classes with `installTo`.

Channels Function: installTo {#Channels:installTo}
--------------------------------------------------

Implements `Channels` into existing classes.

### Syntax:

	Channels.installTo(Obj);
	Channels.installTo([Obj1, Obj2]);

### Arguments:

1. Obj - (*class*) A Class to implement `Channels`.


Channels Method: publishes {#Channels:publishes}
------------------------------------------------

Sets up an object to publish to a channel when one of it's own events occur.

### Syntax:

	obj.publishes(eventName, channel);
	obj.publishes(eventName, [channel, channel2])
	obj.publishes({
	  eventName: channel
	});

### Arguments:

1. eventName - (*string*) A string representing an object's event.  Like `click` or `complete` without the "on" prefix.
2. channel - (*string*) The name of the channel to publish the event to.

### Note:

Unlike traditional pub/sub models, `publishes` does not "publish", fire the event, it simply sets up the object to publish when the object's own events occur.  To publish an event manually use `obj.fireEvent(eventName)`;


Channels Method: subscribe {#Channels:subscribe}
------------------------------------------------

Subscribes an object to a channel.  When the channel is published to the function will be called.

### Syntax:

	obj.subscribes(channel, fn);
	obj.subscribes({
	  channel: fn
	});

### Arguments:

1. channel - (*string*) The name of the channel to subscribe to.
2. fn - (*function*) The function to call when the channel is published to.


Channels Function: remove {#Channels:remove}
--------------------------------------------------

Removes an channel completely.  Any subscriptions will have no effect.

### Syntax:

	Channels.remove(channel);

### Arguments:

1. channel - (*string*) A string representing the channel to remove.



Channels Property: publishing {#Channels:publishing}
----------------------------------------------------

An array of objects representing all channels currently being published. Mostly helpful for debugging.

### Syntax:

	Channels.publishing;


Channels Function: subscriptions {#Channels:subscriptions}
----------------------------------------------------------

An array of objects representing all subscriptions.  Mostly helpful for debugging.

### Syntax:

	Channels.publishing;

