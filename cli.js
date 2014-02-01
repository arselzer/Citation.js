var argv = require("optimist").argv,
    Mla = require("./index.js");

if (argv.site || argv.s) {
  var url = "http://" + (argv.site || argv.s);
  var mla = new Mla(url);
  mla.getMlaReference(function(err, citation) {
    if (err) throw err;
    console.log(citation);
  });
}
else {
  console.log("Usage: node cli.js --site en.wikipedia.org/wiki/JavaScript");
}
