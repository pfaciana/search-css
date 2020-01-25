const babelify = require('babelify'),
	browserifyBuffer = require('browserify-buffer'),
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	brotli = require('gulp-brotli'),
	ceol = require('gulp-conditional-eol'),
	createTasks = require('gulp-create-tasks'),
	debug = require('gulp-debug'),
	gulpif = require('gulp-if'),
	rename = require("gulp-rename"),
	size = require('gulp-size'),
	terser = require('gulp-terser'),
	browsers = 'last 2.5 years, ie 11';

const options = {
	browsers,
	babelrc: {
		presets: [
			["@babel/preset-env", {targets: {browsers}}],
			["@babel/preset-react", {targets: {browsers}}],
		],
	},
	exclude: ['./**/*', '!./css/**/*', '!./fonts/**/*', '!./node_modules/**/*', '!./vendor/**/*',],
	watchTasks: true,
};

const builds = {
	js: {
		configs: [{
			id: 'search-css',
			src: './index.js',
			dest: './dist',
			watch: ['./index.js', './js/**/*.js'],
			alsoMin: true,
			browserify: true,
			post: ['clean'],
		}],
		cb(_) {
			return gulp.src(_.src)
				.pipe(gulpif(_.browserify, browserifyBuffer([
					...(_.babelrc ? [[babelify, _.babelrc]] : []),
				]), gulpif(_.babelrc, babel(_.babelrc))))
				.pipe(rename({basename: _.id}))
				.pipe(gulpif(_.minify, terser()))
				.pipe(gulpif(_.minify, rename({suffix: '.min'})))
				.pipe(gulpif(_.debug, debug(_.debug)))
				.pipe(gulpif(_.minify && _.size, size(_.size)))
				.pipe(gulp.dest(_.dest))
				.pipe(gulpif(_.minify, brotli.compress({extension: 'br', quality: 11})))
				.pipe(gulpif(_.minify && _.sizeNgz, size(_.sizeNgz)))
				.pipe(gulpif(_.minify, gulp.dest(_.dest)));
		},
	},
	clean: {
		configs: [{
			id: 'all',
			debug: {title: 'clean:all'},
		}],
		cb(_) {
			return gulp.src(_.exclude, {base: (_.base || './'), since: gulp.lastRun(_.cb)})
				.pipe(gulpif(_.ceol, ceol(_.ceol)))
				.pipe(gulpif(buffer => !buffer.isDirectory(), gulpif(_.debug, debug(_.debug))))
				.pipe(gulp.dest((_.dest || './')));
		},
	},
};

createTasks(builds, options);