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
Mla.prototype.setSite = function (site) {
  this.site = site;
};

// Mla#useExtensions([])
Mla.prototype.useExtensions = function (extensions) {
  var self = this;
  extensions.forEach(function (extension) {
    self.extensions.push(extension);
  });
};

function getOrganization(site, cb) {
  var domain = site.match(/http[s]?:\/\/([a-z\.\-]+)/)[1];
  fs.readFile(__dirname + "/organizations.json", function (err, data) {
    if (err) {
      cb(err, undefined);
    } else {
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
      } else {
        cb(undefined, null);
      }
    }
  });
}

// Mla#getReference(function(err, citation))
Mla.prototype.getReference = function (callback) {
  var self = this;
  var site = this.site;

  async.waterfall([
    
    function(cb) {
      request(site, function (err, res, body) {
        if (!err)
          cb(err, body);
        else
          cb(err, null);
      });
    },
    
    function(body, cb) {
      getOrganization(site, function (err, organization) {
        if (!err)
          cb(null, body, organization);
        else
          cb(err, null);
      });
    },
    
    function(body, organization, cb) {
      var citation = {};

      var $ = cheerio.load(body);

      /* default values */

      // MLA Field 1: author
      citation.author = null;

      // MLA field 2: title
      citation.title = $("head title").text();

      // MLA field 3: organization
      citation.organization = organization;

      // MLA field 4: media type
      citation.type = "Web";

      // MLA field 5: date accessed
      citation.accessDate = (new Date()).toDateString();

      // MLA (non-standard, see README) field 6: URL
      citation.url = site;

      self.extensions.forEach(function (extension) {
        if (extension.check($))
          return extension.call($, citation);
        else
          return null;
      });

      callback(undefined, citation);
      }]);
};

// Mla#convertToMla(citation)
Mla.convertToMla = function (citation) {
  var MLA = "";

  var mlaFields = [];

  // 1
  mlaFields.push(citation.author);
  // 2
  mlaFields.push(citation.title);
  // 3
  mlaFields.push(citation.organization);
  // 4
  mlaFields.push(citation.type);
  // 5
  mlaFields.push(citation.accessDate);
  // 6
  mlaFields.push(citation.url);

  mlaFields.forEach(function (field) {
    if (typeof (field) === undefined || field === null)
    ;
    else if (field === "url")
      MLA += "<" + field + ">. ";
    else
      MLA += field + ". ";
  });

  return MLA;
};

// Mla#getMlaReference(function(err, citation))
Mla.prototype.getMlaReference = function (cb) {
  this.getReference(function (err, citation) {
    if (err) {
      cb(err, undefined);
    } else {
      var MLA = Mla.convertToMla(citation);
      cb(undefined, MLA);
    }
  });
};

module.exports = Mla;