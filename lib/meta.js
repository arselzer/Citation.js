exports.check = function($) {
  return $('meta[name="author"]').length > 0;
  console.log("ChechK!");
};

exports.call = function($, citation) {
  return $('meta[name="author"]').attr("content");
};
