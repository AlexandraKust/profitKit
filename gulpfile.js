const { src, dest, series, watch } = require('gulp')
const htmlMin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const image = require('gulp-image')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const del = require('del');
const browserSync = require('browser-sync').create()


const clean = () => {
	return del(['dist'])
}

const fonts = () => {
	return src([
		'src/fonts/**/*.woff',
		'src/fonts/**/*.woff2'
	])
		.pipe(dest('dist/fonts'))
}

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlMin({
			collapseWhitespace: true,
		}))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}

const scss = () => {
	return src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
};

const svgSprites = () => {
	return src('src/media/icon/**/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			}
		}))
		.pipe(dest('dist/media'))
}

const images = () => {
	return src([
		'src/media/**/*.jpg',
		'src/media/**/*.png',
		'src/media/*.svg',
		'src/media/**/*.jpeg',
	])
		.pipe(image())
		.pipe(dest('dist/media'))
}

const script = () => {
	return src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify().on('error', notify.onError()))
		.pipe(sourcemaps.write())
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream())
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
}

watch('src/**/*.html', htmlMinify)
watch('src/sass/**/*.scss', scss)
watch('src/media/icon/**/*.svg', svgSprites)
watch('src/js/**/*.js', script)
watch('src/fonts/**', fonts)

exports.default = series(clean, htmlMinify, fonts, images, scss, svgSprites, script, watchFiles)