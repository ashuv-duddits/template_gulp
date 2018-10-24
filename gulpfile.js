var gulp         	= require('gulp'),
		sass         	= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		cleanCSS     	= require('gulp-clean-css'),
		rename  			= require('gulp-rename'),
		browserSync  	= require('browser-sync').create(),
		concat      	= require('gulp-concat'),
		uglify       	= require('gulp-uglify');

gulp.task('browser-sync', ['sass', 'scripts'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
				notify: false
    });
});

gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src(['./js_libs/*.js'])
		.pipe(concat('libs.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify()) 
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js_libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});