'use strict'
const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const webpackConfig = require('./webpack.config.js');
const gulpsass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const pug = require('gulp-pug');


let statsLog = { // для красивых логов в консоли
	colors: true,
	reasons: true,
}


gulp.task('pug', () =>
	gulp.src('./src/views/pages/**/*.pug')
		.pipe(pug({
			// Your options in here.
		}))
		.pipe(rename( path => path.dirname = '/' ))
		.pipe(gulp.dest('dist'))
)

gulp.task('image', () =>
	gulp.src('./src/img/**/*')
		.pipe(gulp.dest('dist/img'))
)

gulp.task('assets', () =>
	gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('dist/assets'))
)

gulp.task('fonts', () =>
	gulp.src('./src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
)

gulp.task('scss', () =>
	gulp.src('./src/styles/main.scss')
		.pipe(gulpsass({importer: tildeImporter}).on('error', gulpsass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2,
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream()),
)


gulp.task('js', (done) => {

	// run webpack
	webpack(webpackConfig, onComplete)

	function onComplete(error, stats) {
		if (error) { // кажется еще не сталкивался с этой ошибкой
			onError(error)
		} else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
			onError(stats.toString(statsLog))
		} else {
			onSuccess(stats.toString(statsLog))
		}
	}

	function onError(error) {
		let formatedError = new gutil.PluginError('webpack', error)
		/*notifier.notify({ // чисто чтобы сразу узнать об ошибке
			title: `Error: ${formatedError.plugin}`,
			message: formatedError.message
		});*/
		done(formatedError)
	}

	function onSuccess(detailInfo) {
		gutil.log('[webpack]', detailInfo)
		done()
	}
})


gulp.task('default', ['pug', 'assets', 'fonts', 'scss', 'js', 'image'], () => {
	browserSync.init({
		server: './dist',
		notify: false,
	})

	gulp.watch('./src/styles/**/*.scss', ['scss'])
	gulp.watch('./src/**/*.js', ['js']).on('change', browserSync.reload)
	gulp.watch('./src/**/*.pug', ['pug']).on('change', browserSync.reload)
	gulp.watch('./src/fonts/**/*', ['fonts']).on('change', browserSync.reload)
	gulp.watch('./src/img/**/*', ['image']).on('change', browserSync.reload)
	gulp.watch('./src/assets/**/*', ['assets']).on('change', browserSync.reload)
})