let gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

// Teste na branch2
gulp.task('clean', () => {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('copy', gulp.series('clean', () => {
    return gulp.src([
        './src/components/**/*'], { 'base': 'src' })
        .pipe(gulp.dest('./dist/'));
}));

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('html', () => {
    return gulp.src(['./src/**/*.html', '!./src/inc/**'])
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uncss', gulp.series('html', () => {
    return gulp.src('./dist/components/**/*.css')
        .pipe(uncss({
            html: ['./dist/*.html']
        }))
        .pipe(gulp.dest('./dist/components/'));
}));

gulp.task('imagemin', () => {
    return gulp.src('./src/imagens/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/imagens/'));
});

gulp.task('build-js', () => {
    return gulp.src('./src/javascript/**/*')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/javascript/'));
});

gulp.task('svgmin', () => {
    return gulp.src(['./src/inc/icons/*.svg','!./src/inc/icons/*.min.svg'])
        .pipe(imagemin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/inc/icons/'));
});

gulp.task('default', gulp.series('copy', () => {
    gulp.start('uncss','imagemin','sass','build-js');
}));

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('html'));
    gulp.watch('./src/javascript/**/*.js', gulp.series('build-js'));
    gulp.watch(['./src/inc/icons/*.svg','!./src/inc/icons/*.min.svg'], gulp.series('svgmin'));
});