var gulp = require('gulp'),
    runSequence = require("run-sequence"),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    intercept = require('gulp-intercept');

var distPath = 'site/';

gulp.task('site:clean', function() {
  return gulp.src(
      ['react'].map(function(dir) { return distPath + dir; }),
      { read: false }
    )
    .pipe(clean());
});

var splitNameToPath = function(path) {
  // dx-react-grid-bs3\... ==> react\grid\bs3\...
  return path
    .replace(/dx-/, '')
    .replace(/-/g, '/');
};

var extractMDTitle = function(content) {
  var matches = /^\s*#\s*([^#]+?)\s*$/m.exec(content);
  return matches ? matches[1] : undefined;
};

var formatFrontMatter = function(title) {
  return `---${title ? '\ntitle: ' + title: ''}\n---\n\n`;
};

var patchMDLinks = function(content) {
  return content
    .replace(/http\:\/\/devexpress\.github\.io/g, '')
    .replace(/(?:(?:\.\.)\/)+(dx-.+?\.md)/g, function(match, path) {
      return '{{site.baseurl}}/'+
        splitNameToPath(path)
        .replace(/readme\.md/i, '');
    })
    .replace(/readme\.md/i, '../');
};

var patchMDTables = function(content) {
  var lines = content.split('\n');

  var withinTable = false;
  var index = 0;
  while(index < lines.length) {
    if (!withinTable && lines[index].indexOf('-|-') > -1) withinTable = true;
    if (withinTable && lines[index].indexOf('|') === -1) {
      withinTable = false;
      lines.splice(index, 0, '{: .table.table-bordered.table-striped }');
    }
    index = index + 1;
  }

  return lines.join('\n');
};

gulp.task('site:docs', function() {
  return gulp.src([
      'packages/**/*.md',
      '!packages/**/LICENSE.md',
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

      content = frontMatter + patchMDTables(patchMDLinks(content));
      file.contents = new Buffer(content);

      return file;
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('site:demos', function() {
  return gulp.src(['packages/dx-react-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'react/grid/demos/dist/'));
});

gulp.task('site', function(done) {
  runSequence(
    'site:clean',
    'site:docs',
    'site:demos',
    done
  );
});
