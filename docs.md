Citation.js Documentation
==========

## `Citation(String url, Array extensions)`

Instantiate a new Citation.js object.  Sets up the site, and loads extensions.

### Example

```JavaScript
var citation = new CitationJS("http://en.wikipedia.org/wiki/JavaScript");
```

## `Citation.prototype.useExtensions(Array extensions)`

Load the extensions into the Citation.js object.

### Example

```JavaScript
citation.useExtensions(function extension);
```

## `Citation.prototype.getReference(function callback(err, reference))`

Get a reference

```JavaScript
citation.getReference(function(err, reference) {
  if (!err)
    console.log(reference);
});
```

## `Citation.prototype.getMlaReference(function(callback(err, reference))`

Get a MLA reference directly.

```JavaScript
citation.getMlaReference(function(err, reference) {
  if (!err)
    console.log(reference);
});
```

## `Citation.convertToMla(reference)`

Convert a CitationJS reference object to MLA.

### Example

```JavaScript
var mlaRef = CitationJS.convertToMla({
  "title": "Array.prototype.sort() - JavaScript | MDN",
  "organization": "Mozilla",
  "lastModDate": null,
  "type": "Web",
  "accessDate": "Thu Mar 13 2014",
  "url": "<http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>"
});
```