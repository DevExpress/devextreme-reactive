import gulp from 'gulp';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import intercept from 'gulp-intercept';

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
          scriptPath: `{{site.baseurl}}/{{page.demos_script_link}}/dist/index.js?v={{ site.time | date: '%s' }}`,
          firstPart: `{{site.baseurl}}//react/`,
          lastPart: `/demos/dist/index.js?v={{ site.time | date: '%s' }}`
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
    'site/react/**/*.md',
    'site/vue/**/*.md',
  ], { read: false }).pipe(clean());
});

gulp.task('site:docs:img', function() {
  return gulp.src(['packages/dx-react-scheduler/docs/*/*.png'], { base: 'packages' })
    .pipe(rename(function(path) {
      path.dirname = splitNameToPath('', path.dirname);
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('site:docs', function() {
  return gulp.src([
      'packages/dx-react-common/docs/*/*.md',
      'packages/dx-react-core/docs/*/*.md',
      'packages/dx-react-grid/demos/*/*.md',
      'packages/dx-react-grid/docs/*/*.md',
      'packages/dx-react-chart/demos/*/*.md',
      'packages/dx-react-chart/docs/*/*.md',
      'packages/dx-react-scheduler/demos/*/*.md',
      'packages/dx-react-scheduler/docs/*/*.md',
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

gulp.task('site:demos:react:grid', function() {
  return gulp.src(['packages/dx-react-grid-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'react/grid/demos/dist/'));
});

gulp.task('site:demos:react:chart', function() {
  return gulp.src(['packages/dx-react-chart-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'react/chart/demos/dist/'));
});

gulp.task('site:demos:react:scheduler', function() {
  return gulp.src(['packages/dx-react-scheduler-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'react/scheduler/demos/dist/'));
});

gulp.task('site:demos:react:common', function() {
  return gulp.src(['packages/dx-react-common/dist/*'])
    .pipe(gulp.dest(distPath + 'react/common/dist/'));
});

gulp.task('site:demos:vue:grid', function() {
  return gulp.src(['packages/dx-vue-grid-demos/dist/*'])
    .pipe(gulp.dest(distPath + 'vue/grid/demos/dist/'));
});

gulp.task('site', gulp.series(
  'site:clean',
  'site:docs',
  'site:docs:img',
  'site:demos:react:grid',
  'site:demos:vue:grid',
  'site:demos:react:chart',
  'site:demos:react:scheduler',
  'site:demos:react:common',
));
