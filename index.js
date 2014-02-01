var request = require("request"),
    fs = require("fs"),
    cheerio = require("cheerio");

function Mla(site) {
  this.setSite(site);
}

// Mla.setSite(site)
Mla.prototype.setSite = function(site) {
  this.site = site;
};

function getOrganization(site, cb) {
  var domain = site.match(/http:\/\/([a-z\.\-]+)/)[1];
  fs.readFile("organizations.json", function(err, data) {
    if (err) {
      cb(err, undefined);
    }
    else {
      var organizationName;
      var organizations = JSON.parse(data.toString());
      for (var organizationDomain in organizations) {
        if ((new RegExp(organizationDomain + "$")).test(domain)) {
          organizationName = organizations[organizationDomain];
        }
      }
      if (organizationName) {
        // MLA field 3: organization
        cb(undefined, organizationName);
      }
      else {
        cb(undefined, null);
      }
    }
  });
}

// Mla.getReference(function(err, citation) { } )
Mla.prototype.getJsonReference = function(cb) {
  var site = this.site;
  request(site, function(err, res, body) {
    if (err) {
      cb(err, undefined);
    }
    else {
      if (err) {
        cb(err, undefined);
      }
      else {
        getOrganization(site, function(err, organization) {
          var citation = {};
          
          var $ = cheerio.load(body);
          
          // MLA field 1: author
          citation.author = $('meta[name="author"]').attr("content");

          // MLA field 2: title
          citation.title = $("head title").text();

          // MLA field 3: organization
          citation.organization = organization;

          // MLA field 4: date of last modification
          citation.lastModDate = null;

          // MLA field 5: media type
          citation.type = "Web";
          
          // MLA field 6: date accessed.
          citation.accessDate = (new Date()).toDateString();

          // MLA (non-standard) field 7: URL
          citation.url = "<" + site + ">";

          cb(undefined, citation);

        });
      }
    }
  });
};

Mla.prototype.getMlaReference = function(cb) {
  this.getJsonReference(function(err, citation) {
    if (err) {
      cb(err, undefined);
    }
    else {
      var MLA = "";
      
      if (citation.author)
        MLA += citation.author + ". ";

      if (citation.title)
        MLA += citation.title + ". ";

      if (citation.organization)
        MLA += citation.organization + ". ";

      if (citation.lastModDate)
        MLA += citation.lastModDate + ". ";

      if (citation.type)
        MLA += citation.type + ". ";

      if (citation.accessDate)
        MLA += citation.accessDate + ". ";

      if (citation.url)
        MLA += citation.url + ". ";

      cb(undefined, MLA);
    }
  });
}

module.exports = Mla;
