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

var injectNpmTag = function(content) {
  const tag = versionTag && versionTag !== 'latest' ? `@${versionTag}` : '';
  return content.replace(/\.npm\-tag\(\)/g, tag);
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
          scriptPath: `{{site.baseurl}}/{{page.demos_link}}/demos/dist/index.js?v={{ site.time | date: '%s' }}`,
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
  return gulp.src([
    'site/react/core/**/*.md',
    'site/react/grid/**/*.md',
    'site/react/chart/**/*.md',
    'site/vue/grid/**/*.md',
  ], { read: false })
    .pipe(clean());
});

gulp.task('site:docs', function() {
  return gulp.src([
      'packages/dx-react-core/docs/*/*.md',
      'packages/dx-react-grid/demos/*/*.md',
      'packages/dx-react-grid/docs/*/*.md',
      'packages/dx-react-chart/docs/*/*.md',
      'packages/dx-vue-grid/demos/*/*.md',
      'packages/dx-vue-grid/docs/*/*.md',
      '!packages/**/LICENSE.md',
      '!packages/**/README.md',
    ], { base: 'packages' })
    .pipe(rename(function(path) {
      path.dirname = splitNameToPath('', path.dirname);
    }))
    .pipe(intercept(function(file){
      if(file.contents) {
        var content = applyInterceptors(
          file.contents.toString(),
          patchMDLinks,
          patchMDTables,
          injectNpmTag,
          injectLiveDemos,
          addFrontMatter
        );
        file.contents = new Buffer(content);
      }
      return file;
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('site:demos:react', function() {
  return gulp.src(['packages/dx-react-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'react/demos/dist/'));
});

gulp.task('site:demos:vue', function() {
  return gulp.src(['packages/dx-vue-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'vue/demos/dist/'));
});

gulp.task('site', function(done) {
  runSequence(
    'site:clean',
    'site:docs',
    'site:demos:react',
    'site:demos:vue',
    done
  );
});
