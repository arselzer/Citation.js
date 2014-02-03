var Citation = require("../citation.js");

var citation = new Citation("http://en.wikipedia.org/wiki/JavaScript");

describe("Citation#getMlaReference", function() {
  this.timeout(20000);
  it("should get a JSON citation for the JavaScript Wikipedia page.", function(done) {
    citation.getMlaReference(function(err, reference) {
      if (err) throw err;
      done();
      console.log(reference)
    });
  });
});

describe("Citation#getReference", function() {
  this.timeout(20000);
  it("should get a JSON citation for the JavaScript Wikipedia page.", function(done) {
    citation.getReference(function(err, reference) {
      if (err) throw err;
      done();
      console.log(reference)
    });
  });
});

describe("Citation#getMlaReference", function() {
  this.timeout(20000);
  it("should get a HTTPS MLA citation for the MDN JS RegExp page.", function(done) {
    citation.setSite("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp");
    citation.getMlaReference(function(err, reference) {
      if (err) throw err;
      done();
      console.log(reference);
    });
  });
});

