// if creating your own class, just use Implements: [Events, Channels]
Channels.installTo(Fx);

window.addEvent('domready', function(){

	var fixture = $('fixture').subscribe({
		'/fx/start': function(){ this.set('text', 'oh cool, the fx started') },
		'/fx/complete': function(){ this.set('text', "All done."); }
	});

	var fx = new Fx.Tween(fixture, {
		property: 'background-color',
		duration: 2000
	}).publishes({
		start: '/fx/start',
		complete: '/fx/complete'
	}).subscribe('/start/fx1', function(){
		this.start('#585858', '#fff');
	});

	var fx2 = new Fx.Tween(fixture, {
		property: 'color',
		duration: 2000
	}).publishes({
		start: '/fx/start',
		complete: '/fx/complete'
	}).subscribe('/start/fx2', function(){
		this.start('#e00', '#000');
	});

	$('fx1-go').publishes('click', ['/fx/start', '/start/fx1']);
	$('fx2-go').publishes('click', ['/fx/start', '/start/fx2']);
	$('go').publishes('click', [
		'fx/start', 
		'/start/fx1', 
		'/start/fx2'
	]);

	// note that when the objects are built up you don't find any
	// references to other objects, just the object's interaction with a channel


/*

	// without channels

	var fixture = $('fixture');
	
	var fx1 = new Fx.Tween(fixture, {
		property: 'background-color',
		duration: 2000
	});

	var fx2 = new Fx.Tween(fixture, {
		property: 'color',
		duration: 2000
	});

	var events = {
		start: function(){
			fixture.set('text', 'oh cool, the fx started');
		},
		complete: function(){
			fixture.set('text', 'All done.')
		}
	};

	fx1.addEvents(events);
	fx2.addEvents(events);

	$('fx1-go').addEvent('click', function(){
		fx1.start('#585858', '#fff');
	});

	$('fx2-go').addEvent('click', function(){
		fx2.start('#e00', '#000');
	});

	$('go').addEvent('click', function(){
		fx1.start('#585858', '#fff');
		fx2.start('#e00', '#000')
	});

*/	
});
