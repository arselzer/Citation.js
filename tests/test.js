var Citation = require("../citation.js");

var citation = new Citation("http://en.wikipedia.org/wiki/JavaScript");

describe("Citation#getMlaReference", function() {
  it("should get a citation for the JavaScript Wikipedia page.", function(done) {
    citation.getMlaReference(function(err, reference) {
      if (err) throw err;
      done();
      console.log(reference)
    });
  });
});
