var request = require("request");

function Mla(site, cb) {
  this.site = site;
  this.getReference();
}

/**
* MLA's Structure:
*
* MLA sucks. seriously. The format is not easily readable, and there is
* no real standard (apparently). Everyone seems to have their own
* interpretation of it. Everything I could find were unclear examples.
*
* There is a book ("MLA Style Manual and Guide to Scholarly Publishing"),
* but it rather seems to be a manual than a clear definition of a standard,
* explaining why there are so many different points of view on the citation
* style. See following:
*
* http://www.library.cornell.edu/resrch/citmanage/mla
* http://www2.liu.edu/cwis/cwp/library/workshop/citmla.htm
* https://owl.english.purdue.edu/owl/resource/747/01/
*
* However, this seems to be the clearest definition:
* http://www.library.arizona.edu/search/reference/citation-mla.html#mlabk8
*
* By the way, the public site of the "Modern Language Association"
* seems very "modern", ...
* 
*
*/

Mla.prototype.getReference = function() {

}
