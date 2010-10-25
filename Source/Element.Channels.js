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

Channels.installTo([Window, Document, Element]);
