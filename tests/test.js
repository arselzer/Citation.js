var Citation = require("../citation.js");

/*
var citation = new Citation("http://en.wikipedia.org/wiki/JavaScript");

Has meta author tag:
*/
var citation = new Citation("http://ga.water.usgs.gov/edu/ph.html");


describe("Citation#getMlaReference", function () {
  this.timeout(20000);
  it("should get a JSON citation for the JavaScript Wikipedia page.", function (done) {
    citation.getMlaReference(function (err, reference) {
      if (err) throw err;
      console.log(JSON.stringify(reference, null, 2));
      done();
    });
  });
});

describe("Citation#getReference", function () {
  this.timeout(20000);
  it("should get a JSON citation for the JavaScript Wikipedia page.", function (done) {
    citation.getReference(function (err, reference) {
      if (err) throw err;
      done();
      describe("Citation#convertToMla", function () {
        it("should convert the citation to MLA from JSON", function (done) {
          var jsonReference = Citation.convertToMla(reference);

          console.log(jsonReference);
          done();
        });
      });
    });
  });
});

describe("Citation#changeSite", function () {
  it("should change the site of the citation object.", function (done) {
    citation.setSite("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp");
    done();
    describe("Citation#getMlaReference", function () {
      this.timeout(20000);
      it("should get a HTTPS MLA citation for the MDN JS RegExp page.", function (done) {
        citation.getMlaReference(function (err, reference) {
          if (err) throw err;
          console.log(reference);
          done();
        });
      });
    });
  });
});

describe("Citation.convertToMla", function() {
  it("should convert a JSON reference to MLA", function (done) {
    var testReference = JSON.parse('{"author": null, "title": "JavaScript - Wikipedia, the free encyclopedia", "organization": "Wikimedia Foundation", "type": "Web", "accessDate": "Fri Mar 14 2014", "url": "http://en.wikipedia.org/wiki/javaScript"}');
    var mlaReference = Citation.convertToMla(testReference);
    console.log(mlaReference);
    done();
  });
});

describe("Citation.getOrganization", function() {
  it("should obtain the organization for a domain name", function(done) {
    var domain = "http://www.google.com";
    Citation.getOrganization(domain, function(err, organization) {
      if (err) throw err;
      console.log(organization);
      done();
    });
  });
});
