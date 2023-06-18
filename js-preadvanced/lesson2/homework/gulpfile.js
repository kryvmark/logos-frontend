const gulp = require('gulp')
const del = require('delete')
const { series, parallel } = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')

const html = () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
}

const styles = () => {
    return gulp.src('src/style/**/*.scss')
        .pipe(sass().on('error', error => console.error('SASS error: ' + error)))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/css'))
}

const images = () => {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
}

const fonts = () => {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
}

const deleteBuild = cb => {
    return del('build/**/*.*').then(() => { cb() })
}

const watch = () => {
    gulp.watch('src/pug/**/*.pug', html)
    gulp.watch('src/style/**/*.scss', styles)
    gulp.watch('src/images/**/*.scss', images)
    gulp.watch('src/fonts/**/*.scss', fonts)
}

exports.default = series(
    deleteBuild,
    parallel(html, styles, images, fonts),
    parallel(watch)
)