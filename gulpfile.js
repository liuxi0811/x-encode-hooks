const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async function () {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

// 编译 esm  ts->js 解析
gulp.task('es', function () {
  // 使用gulp-typescript解析ts
    const tsProject = ts.createProject('tsconfig.pro.json', {
      module: 'ESNext',
    });
    return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

//实现commonjs规范的编译
gulp.task('cjs', function () {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

// 实现d.ts文件的生成
gulp.task('declaration', function () {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async function () {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

// 传入gulp.series()方法，按顺序执行任务
exports.default = gulp.series('clean', 'es', 'cjs', 'declaration', 'copyReadme');
