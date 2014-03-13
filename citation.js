var fs = require("fs");
var async = require("async");
var request = require("request");
var cheerio = require("cheerio");

var defaultExtensions = [
  require("./lib/meta"),
  require("./lib/wikipedia")
];

// new Mla(String, [])
function Mla(site, extensions) {
  this.extensions = [];

  // Use default etensions.
  this.useExtensions(defaultExtensions);

  // Construct using site.
  if (site)
    this.setSite(site);

  if (extensions) {
    this.useExtensions(extensions);
  }
}

// Mla#setSite(String)
Mla.prototype.setSite = function(site) {
  this.site = site;
};

// Mla#useExtensions([])
Mla.prototype.useExtensions = function(extensions) {
  var self = this;
  extensions.forEach(function(extension) {
    self.extensions.push(extension);
  });
};

function getOrganization(site, cb) {
  var domain = site.match(/http[s]?:\/\/([a-z\.\-]+)/)[1];
  fs.readFile(__dirname + "/organizations.json", function(err, data) {
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

// Mla#callExtension
Mla.prototype.callExtension = function(extension, $) {

};

// Mla#getReference(function(err, citation))
Mla.prototype.getReference = function(cb) {
  var self = this;
  var site = this.site;

  request(site, function(err, res, body) {
    if (err) {
      cb(err, undefined);
    }
    else {
      getOrganization(site, function(err, organization) {
        var citation = {};

        var $ = cheerio.load(body);
        
        self.extensions.forEach(function(extension) {
  				if (extension.check($))
    				return extension.call($, citation);
  				else
    				return null;
        })

        // MLA field 2: title
        citation.title = $("head title").text();

        // MLA field 3: organization
        citation.organization = organization;

        // MLA field 5: media type
        citation.type = "Web";

        // MLA field 6: date accessed.
        citation.accessDate = (new Date()).toDateString();

        // MLA (non-standard) field 7: URL
        citation.url = site;

        cb(undefined, citation);

      });
    }
  });
};

// Mla#convertToMla(citation)
Mla.prototype.convertToMla = function(citation) {
  var MLA = "";
  
  for (var field in citation) {
    if (citation[field] === null)
      ;// Nothing
    else if (field === "url")
      MLA += "<" + citation[field] + ">. ";
    else
      MLA += citation[field] + ". ";
  }

  return MLA;
};

// Mla#getMlaReference(function(err, citation))
Mla.prototype.getMlaReference = function(cb) {
  this.getReference(function(err, citation) {
    if (err) {
      cb(err, undefined);
    }
    else {
      var MLA = Mla.prototype.convertToMla(citation);
      cb(undefined, MLA);
    }
  });
};

module.exports = Mla;
