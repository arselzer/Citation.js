Citation.js
========

## Why another MLA Citation generator?

There are a few notable online citation-tools.
Most just work in some way, but come with disadvantages:
* They are closed-source.
* They are full of advertisements.
* They are performing a simple process in a complicated way.

Most people will simply want to cite web sites,
and luckily the basic citing of web sites
in MLA is not a complicated process.

It is incredible that students are required to cite
their sources in "MLA format",
and then are told to "go to EasyBib or Citationmachine",
not knowing how the "standard" works.

These sites do not only good.
They are slow, unreliable, greedy.

You don't deserve being reliant on these services.

This is why I am creating Citation.js.
We *need* a open-source framework to gather citation data
and compete with commercial services.

## Weaknesses

### Organizations

Citation.js has a list of domain names mapping to the
names of the organization owning them.
If a domain is not in the list, the organization will
not show up.

I hope to solve this problem by crawling lists of organizations.
In the meantime they will have to be added manually to the
file (organizations.json).

Not including the organization does not invalidate the citation.
It may (or may not) just make it more convenient.

### Publishing dates

Grabbing the publishing date of an article is not yet supported
on any site. I will soon implement it on the biggest sites (and
blogging frameworks), but it will never work on all sites.

The publishing date is mandatory by definition, but it is not
possibly to provide it on every site.
Every user of other sites
has invalid sources should the rule apply and no publishing date is found,
but I believe it is insensible to judge a source based on a missing date.

It may be possible to approximate the date of publication by searching the google archive.

### Authors

It is always attempted to get the contents of the standard meta tags,
but getting the name of the author will also never work everywhere.

## Library

Set the site, which to cite.
`Citation.setSite(site)`

Get a reference object.
`Citation.getReference`

Get a MLA reference string.
`Citation.getMlaReference`

### Example

```javascript
// Import Citation.js.
var Citation = require("./citation.js");

// Create a new citation object.
var citation = new Citation("http://en.wikipedia.org/wiki/JavaScript");

// Asynchronously obtain a MLA citation.
citation.getMlaReference(function(err, reference) {
  if (err) throw err;
  console.log(reference)
});
```

`JavaScript - Wikipedia, the free encyclopedia. Wikimedia Foundation. Web. Sat Feb 01 2014. <http://en.wikipedia.org/wiki/JavaScript>.`

## Critique on MLA

MLA sucks.
The format is not easily readable, and there is
no centrally accepted definition of the standard.

Everyone seems to have their own interpretation of it.

There is a book of by MLA association,
"MLA Style Manual and Guide to Scholarly Publishing",
but it seems more like a manual than a clear standardization effort,
possibly explaining why there are so many different points of
view on format of the citation style.

See the following intrepretations:

http://www.library.cornell.edu/resrch/citmanage/mla
http://www2.liu.edu/cwis/cwp/library/workshop/citmla.htm
https://owl.english.purdue.edu/owl/resource/747/01/

This seems to be the clearest definition:
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
