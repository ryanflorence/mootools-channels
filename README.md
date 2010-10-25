Channels
========

`Channels` simply relay an object's events to a mediator `Events` object, allowing other objects to subscribe to the events. This is simply an alternative pattern you may find helpful when organizing your code.  It extends upon the traditional "pub/sub" pattern already existent in MooTools.

_Without channels_

    var req = new Request(options),
        el = $('some-id'),
        fx = Fx.Tween(el);
    
    req.addEvent('complete', function(response){
      // this == req
      // lots of objects make it in here
      el.set('text', response);
      fx.start();
    });

_With Channels_

    var req = new Request(options)
    req.publishes('complete', '/req/complete');
    
    var el = $('some-id');
    el.subscribe('/req/complete', function(response){
      this.set('text', response);
    });
    
    var fx = Fx.Tween(el);
    fx.subscribe('/req/complete', function(){
      this.start();
    });

Most of the time, when objects need to communicate with each other, you don't care about the object that fires the event, you care about some other object that is managed in the event.  Using `Channels` you can keep the logic pertaining to a particular object all in the same place instead of scattered throughout your application in different event handlers.

_Chaining_

Chaining is often helpful, and fully supported in `Channels`.

    var req = new Request(options).publishes('complete', 'req/complete'),
        el = $('some-id').subscribe('/req/complete', function(res){ this.set('text', res); }),
        fx = Fx.Tween(el).subscribe('/req/complete', function(){ this.start() });

Instance Methods
----------------

Both methods, `publishes` and `subscribe`, take either two args, or an object literal.

    el.publishes('mouseenter', 'channel');
    fx.publishes({
      'start': '/some/channel',
      'complete': '/another/channel'
    });

The `publishes` method can take an array for the second argument (or `value` in the case of a key:value object literal):

    el.publishes('click', ['channel1', 'channel2', 'channel3']);

Channels Methods & Properties
-----------------------------

The `Channels` object has a couple properties and a method:

    // remove a channel completely
    Channels.remove('channel');
    
    // array of current channels being published, helpful for debugging
    Channels.publishing;
    
    // array of current subscriptions, helpful for debugging
    Channels.subscriptions;

Works on the Server and the Client
----------------------------------

Mediating element events is optional, making this script ideal for both server-side and client-side scripts.  You need to include `Element.Channels` if you want to mediate element events.


Todo
----

Unsubscribe an object from a channel with `unsubscribe`, but keep other element subscriptions in tact.


MooTools and Publish Subscribe
==============================

If you're looking for traditional pub/sub with MooTools, look no further than `window`, duh.

    var semantics {
      subscribe : 'addEvent',
      publish   : 'fireEvent',
      unsubsribe: 'removeEvents'
    };
    
    window.addEvent('some/channel', function(arg){ /* do stuff with `arg` */ });
    window.fireEvent('some/channel', arg);
    window.removeEvents('some/channel');

