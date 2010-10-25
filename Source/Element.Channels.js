/*
---

name: Element.Channels

description: Mediate Element events. An expanded pattern for pub/sub.

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

authors: Ryan Florence

requires:
  - /Channels
  - Core/Element.Event

provides: [Element.Channels]

...
*/

[Window, Document, Element].each(function(item){
	Channels.installTo(item);
});


