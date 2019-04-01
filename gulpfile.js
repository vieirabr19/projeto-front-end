let gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');


gulp.task('clean', () => {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('copy', gulp.series('clean', () => {
    return gulp.src([
            './src/components/**/*',
            './src/css/**/*',
            './src/javascript/**/*',
            './src/components/**/*',
            './src/imagens/**/*'
        ], { 'base': 'src' })
        .pipe(gulp.dest('./dist'));
}));

gulp.task('sass', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', () => {
    return gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('javascript', () => {
    return gulp.src('./src/javascript/**/*.js')
        .pipe(gulp.dest('./dist/javascript'));
});

gulp.task('server', gulp.series('html', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('./dist/**/*').on('change', browserSync.reload);
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('html'));
    gulp.watch('./src/javascript/**/*.js', gulp.series('javascript'));
}));