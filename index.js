var request = require("request"),
    cheerio = require("cheerio");

function Mla(site) {
  this.setSite(site);
}

// Mla.setSite(site)
Mla.prototype.setSite = function(site) {
  this.site = site;
};

// Mla.getOrganization(function(err, citation) { } )
Mla.prototype.getOrganization = function(cb) {
  var domain = /^.*\//.exec(this.site)[0]
  cb(undefined, domain);
};

// Mla.getReference(function(err, citation) { } )
Mla.prototype.getReference = function(cb) {
  request(this.site, function(err, res, body) {
    if (err) {
      cb(err, undefined);
    }
    else {
      var $ = cheerio.load(body);

      // MLA field 1: author
      var author = $('meta[name="author"]').attr("content");

      // MLA field 2: title
      var title = $("head title").text();

      // MLA field 3: organization
      var organization;
      Mla.getOrganization(function(err, domain) {
        console.log(domain);
      });

      // MLA field 4: date of last modification
      var lastModDate;

      // MLA field 5: date accessed.
      var accessDate = (new Date()).toDateString();

      var citation = {
        "author" : author,
        "title" : title,
        "organization" : organization,
        "last-mod-date" : lastModDate,
        "type" : "Web",
        "access-date" : accessDate
      };

      cb(undefined, citation);
    }
  });
};

module.exports = Mla;
