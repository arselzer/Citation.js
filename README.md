Citation.js
========
[![devDependency Status](https://david-dm.org/AlexanderSelzer/Citation.js/dev-status.svg?style=flat)](https://david-dm.org/AlexanderSelzer/Citation.js#info=devDependencies)
See the [Documentation](https://github.com/AlexanderSelzer/Citation.js/blob/master/docs.md)

## Why, exactly?

There are a few notable online citation-tools.
Most *just work in some way*, but they come with big disadvantages:
* They are closed-source.
* They are full of advertisements.
* They are solving a simple problem in a complicated way.

Most will simply want to cite web sites,
and unsurprisingly the this is not a very complicated
process.

It is bad that students are required to cite
their sources in the "MLA format",
and are then told to "go to EasyBib or Citationmachine",
not knowing how the "standard" works.

These sites are slow, unreliable, greedy.
We should not be realiant on them

We need a open-source framework to gather reference data
effectively and present it well.

## What

This is just a library. It can scrape sites efficiently, and
extract the reference data, while including tools for converting
formats, and obtaining the organization of a domain name.

## Features Still needing work

### Organizations

Citation.js has a list of domain names mapping to the
names of the organization owning them.
If a domain is not in the list, the organization will
not show up in the reference.

Possibly lists of orgaizations and their domains exits.
I will try to scrape them and add them to the database,
but everyone should feel free to manually add domains
to the database.

### Publishing dates

Extracting the publishing date is not yet supported, but
take a look at the extension interface if you feel like
adding some site-specific extension to citation.js.

The publishing date is supposed to me mandatory according
to most MLA documents,
however MLA web services do widely disrespect this.

### Authors

Citation.js just looks at meta tags, but writing an extension
for more sites is easy.

### Other formats?

I am aware that other formats exist beside MLA, such as APA.

There is currently no way of extending the reference export functions,
but it will surely come in the future.

### Example

```javascript
var Citation = require("./citation.js");

var citation = new Citation("http://en.wikipedia.org/wiki/JavaScript");

citation.getMlaReference(function(err, reference) {
  if (err) throw err;
  console.log(reference)
});
```

`JavaScript - Wikipedia, the free encyclopedia. Wikimedia Foundation. Web. Sat Feb 01 2014. <http://en.wikipedia.org/wiki/JavaScript>.`

## Critique on MLA

MLA is a horrible format.
There is no centrally accepted definition of the standard.

Everyone seems to have their own interpretation of it.

There is a book written by by *MLA association*,
"MLA Style Manual and Guide to Scholarly Publishing",
but it seems more like a manual than a clear standardization effort,
possibly explaining why there are so many different points of
view on format of the citation style.

See the following intrepretations:

http://www.library.cornell.edu/resrch/citmanage/mla
http://www2.liu.edu/cwis/cwp/library/workshop/citmla.htm
https://owl.english.purdue.edu/owl/resource/747/01/

This is the clearest definition I found:
http://www.library.arizona.edu/search/reference/citation-mla.html#mlabk8

The public site of the "Modern Language Association"
seems very "modern".
Their standard, as well, got stuck in time,
by being aimed at sources of information,
such as print and direct interviews,
which have become highly uncommon in today's schools.

In my opinion,
`"PH." Wikipedia. Wikimedia Foundation, 26 Jan. 2014. Web. 29 Jan. 2014. <http://en.wikipedia.org/wiki/PH>.`
is not a nice solution for referencing media on the web.

MLA is unordered.
It does not seem to be clear if it is acceptable to leave out elements.
Different generator sites deal with this problem differently,
effectively making the collection an unordered list.

Unordered data makes scraping and generating trees of citations
challenging for crawlers.
It prevents word processors from recognizing sources automatically.

No "manual" says that the URL has to be given,
but not specifying the URL makes most modern sites useless.

Attempting to find the original location of the title
is like brute-forcing hashes with a great amount of colisions.

I have had teachers, which ask to "cite in MLA", and then
complain that there are no URLs,
but according to the vague decentral definitions, leaving it out
would be perfectly reasonable.

We need a better standard for citations.
