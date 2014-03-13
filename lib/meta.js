exports.check = function($) {
  return $('meta[name="author"]').length > 0;
};

exports.call = function($, citation) {
  citation.author = $('meta[name="author"]').attr("content");
};
