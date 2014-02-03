var gulp = require("gulp");
var log = require("gulp-util").log;
var jshint = require("gulp-jshint");
var mocha = require("gulp-mocha");

gulp.task("jshint", function() {
  log("jshinting files.");
  gulp.src("./*.js")
  .pipe(jshint())
  .pipe(jshint.reporter("default"));
});

gulp.task("mocha", function() {
  gulp.src("./tests/*.js")
  .pipe(mocha({reporter: "nyan"}));
});

gulp.task("watch", function() {
  log("Watching...");
  gulp.watch(paths, ["jshint"]);
});

gulp.task("default", ["jshint", "mocha"]);
