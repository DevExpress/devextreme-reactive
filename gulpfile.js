var gulp = require('gulp'),
    runSequence = require("run-sequence"),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    intercept = require('gulp-intercept');

var distPath = 'gh-pages-dist/';

gulp.task('gh-pages:clean', function() {
  return gulp.src(distPath, { read: false })
    .pipe(clean());
});

var splitNameToPath = function(path) {
  // dx-react-datagrid-bs3\... ==> react\datagrid\bs3\...
  return path
    .replace(/dx-/, '')
    .replace(/-/g, '\\');
};

var extractMDTitle = function(content) {
  var matches = /^\s*#\s*([^#]+?)\s*$/m.exec(content);
  return matches ? matches[1] : undefined;
};

var formatFrontMatter = function(title) {
  return `---${title ? '\ntitle: ' + title: ''}\n---\n\n`;
};

var patchMDLinks = function(content) {
  return content.replace(/\.md\)/g, '/)');
};

gulp.task('gh-pages:docs', function() {
  return gulp.src([
      'packages/**/*.md',
      '!packages/dx-react-demos/**/*',
      '!/**/node_modules/**/*'
    ])
    .pipe(rename(function(path) {
      path.dirname = splitNameToPath(path.dirname);
      path.basename = path.basename
        .replace(/readme/i, 'index');
    }))
    .pipe(intercept(function(file){
      var content = file.contents.toString(),
          title = extractMDTitle(content),
          frontMatter = formatFrontMatter(title);

      content = frontMatter + patchMDLinks(content);
      file.contents = new Buffer(content);

      return file;
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('gh-pages:demos', function() {
  return gulp.src([ 'packages/dx-react-demos/dist/index.js' ])
    .pipe(gulp.dest(distPath + 'react/datagrid/demos/dist/'));
});

gulp.task('gh-pages', function(done) {
  runSequence(
    'gh-pages:clean',
    'gh-pages:docs',
    'gh-pages:demos',
    done
  );
});
