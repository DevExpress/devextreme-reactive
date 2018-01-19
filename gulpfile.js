var gulp = require('gulp'),
    runSequence = require("run-sequence"),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    intercept = require('gulp-intercept');

var distPath = 'site/';
var versionTag = process.env.VERSION_TAG;

var splitNameToPath = function(pathPrefix, path) {
  // {prefix}dx-react-grid-bs3/... ==> {prefix}{../../}?react/grid/bs3/...
  const dxPartEnd = path.indexOf('/');
  const dxPart = path.slice(0, dxPartEnd).replace(/dx-/, '');
  return pathPrefix
    + (pathPrefix ? '../'.repeat(dxPart.split('-').length - 1) : '')
    + dxPart.replace(/-/g, '/')
    + path.slice(dxPartEnd);
};

var extractMDTitle = function(content) {
  var matches = /^\s*#\s*([^#]+?)\s*$/m.exec(content);
  return matches ? matches[1] : undefined;
};

var formatFrontMatter = function(title) {
  return `---${title ? '\ntitle: ' + title: ''}\n---\n\n`;
};

var addFrontMatter = function(content) {
    var title = extractMDTitle(content),
        frontMatter = formatFrontMatter(title);

    return frontMatter + content;
};

var patchMDLinks = function(content) {
  return content
    .replace(/((?:(?:\.\.)\/)+)(dx-.+?\.md)/g, function(match, pathPrefix, path) {
      return splitNameToPath(pathPrefix, path);
    });
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

var applyInterceptors = function(content, ...interceptors) {
  return interceptors.reduce((result, interceptor) => {
    return interceptor(result);
  }, content);
};

var injectLiveDemos = function(content) {
  return content
    .replace(
      /\.embedded\-demo\(([^\(\)]*)\)/g,
      function(match, p1) {
        const data = JSON.parse(p1);
        const options = {
          ...data,
          path: `/demo/${data.path}`,
          scriptPath: `/devextreme-reactive/react/grid/demos/dist/index.js?v=${new Date().getTime()}`,
        };
        return `<div
          class="embedded-demo"
          data-options='${JSON.stringify(options)}'
        >
          <div class="loading-shading">
            <span class="glyphicon glyphicon-refresh loading-icon"></span>
          </div>
        </div>`
      });
};

gulp.task('site:clean', function() {
  return gulp.src(
      ['react'].map(function(dir) { return distPath + dir; }),
      { read: false }
    )
    .pipe(clean());
});

gulp.task('site:docs', function() {
  return gulp.src([
      'packages/**/*.md',
      '!packages/**/LICENSE.md',
      '!packages/dx-react-demos/**/*',
      '!packages/dx-testing/**/*',
      '!/**/node_modules/**/*'
    ])
    .pipe(rename(function(path) {
      path.dirname = splitNameToPath('', path.dirname);
      path.basename = path.basename
        .replace(/readme/i, 'index');
    }))
    .pipe(intercept(function(file){
      if(file.contents) {
        var content = applyInterceptors(
          file.contents.toString(),
          patchMDLinks,
          patchMDTables,
          injectLiveDemos,
          addFrontMatter
        );
        file.contents = new Buffer(content);
      }
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
