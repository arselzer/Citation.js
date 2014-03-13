Citation.js Extensions
======

Every extension should expose two functions.

`Extension.check(jQuery)` - The extension will only get called if this returns true.

`Extension.call(jQuery, citation)` This modifies the citation object after searching the HTML.