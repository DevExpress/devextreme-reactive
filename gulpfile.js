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

gulp.task('gh-pages:docs', function() {
  return gulp.src([
      'packages/**/*.md',
      '!packages/dx-react-demos/**/*',
      '!/**/node_modules/**/*'
    ])
    .pipe(rename(function(path) {
      path.dirname = path.dirname
        .replace(/dx-/, '')
        .replace(/-/g, '\\');

      path.basename = path.basename
        .replace(/readme/i, 'index');
    }))
    .pipe(intercept(function(file){
      var contents = file.contents.toString(),
          matches = /^\s*#\s*([^#]+?)\s*$/m.exec(contents),
          title = matches ? matches[1] : undefined,
          frontMatter = `---${title ? '\ntitle: ' + title: ''}\n---\n\n`;

      contents = contents.replace(/\.md\)/g, '/)');
      file.contents = new Buffer(frontMatter + contents, 'utf-8');

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
