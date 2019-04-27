//http://lukasholoubek.com/configuring-an-electron-development-environment/

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');

// Create an electron-connect server to enable reloading
const electron = require('electron-connect').server.create();

gulp.task('sass', function(){
    return gulp.src('resources/sass/**/*.scss')
               .pipe(sass()) // Converts Sass to CSS with gulp-sass
               .pipe(autoprefixer())
               .pipe(gulp.dest('dist/css/'))
});

gulp.task('js', function(){
    return gulp.src('resources/js/common/*.js')
               // .pipe(concat('[name].js'))
               .pipe(gulp.dest('dist/js/'))
});

gulp.task('build', function(){
    return gulp.src(['resources/sass/**/*.scss', 'resources/js/**/*.js'])
               .pipe(gulpIf('*.js', uglify()))
               // Minifies only if it's a CSS file
               .pipe(gulpIf('*.css', cssnano()))
               .pipe(gulp.dest('dist'))
});

gulp.task('serve', function () {

    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch('resources/sass/**/*.scss', gulp.series('sass', reload));
    gulp.watch('resources/js/**/*.js', gulp.series('js', restart));
    gulp.watch('index.html', restart);
});


function restart( done ) {
    electron.restart( '--enable-logging', function( state ) {
        if ( state === 'restarted' || state === 'restarting' ) {
            done( null );
        } else {
            done( 'Unexpected state while restarting electron-connect server. State ' + state );
        }
    });
}

function reload( done ) {
    electron.reload();
    done( null );
}
