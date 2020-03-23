var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sassLint     = require('gulp-sass-lint');

const inFolderCss = "./assets/scss/"
const outPutFolderCss = "./dist/css/"
const inFolderJs = "./assets/js/"
const outPutFolderJs = "./dist/js/"

gulp.task('sass-lint', function() {
	return gulp.src([inFolderCss + '**/*.scss', inFolderCss + 'app.scss'])
				.pipe(sassLint({configFile: '.sass-lint.yml'}))
				.pipe(sassLint.format())
				.pipe(sassLint.failOnError())
});

// Compile & minify SASS
gulp.task('sass-main', function () {
	return gulp.src(inFolderCss + 'app.scss')
				.pipe(sass({outputStyle: 'expanded'}))
				.pipe(autoprefixer())
				.pipe(minifycss())
				.pipe(rename('app.min.css'))
				.pipe(gulp.dest(outPutFolderCss));
});

// ALERT
gulp.task('console-alert', function() {
  console.log('******************** THERE IS A MODIFICATION ********************');
});

// Default Task
gulp.task('default', ['sass-lint', 'sass-main']);

// Watch Task
gulp.watch(inFolderCss + '**/*.scss', ['console-alert', 'sass-lint', 'sass-main']);





