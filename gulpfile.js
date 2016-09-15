const config    = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const gulp          = require('gulp')
const sass          = require('gulp-sass')
const pug           = require('gulp-pug')
const s3            = require('gulp-s3-upload')(config)
const argv          = require('yargs').argv
const browserSync   = require('browser-sync').create();







gulp.task('main-pug', () => {
  return  gulp.src('./development/*.pug')
    .pipe(pug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./production/'))
})

gulp.task('blog-pug', () => {
  return  gulp.src('./development/blog/*.pug')
    .pipe(pug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./production/blog/'))
})


// Render all pug files and watch them for changes
gulp.task('pug:watch', ['main-pug', 'blog-pug'], () => {
  gulp.watch(['./development/blog/*.pug', './development/includes/*.pug'], ['blog-pug', 'main-pug']);
});





gulp.task('sass', () => {
  return gulp.src('./development/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./production/resources/css/'));
});

// Render all sass files and watch them for changes
gulp.task('sass:watch', ['sass'], () => {
  gulp.watch('./development/sass/**/*.scss', ['sass']);
});




gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./production"
        },
        open: false
    });
});




gulp.task("upload", ['main-pug', 'blog-pug', 'sass'], () => {
  return  gulp.src("./production/**/*")
    .pipe(s3({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ACL:    'public-read'
    }, 
    {
      maxRetries: 5
    }))
})


gulp.task('default', argv.deploy ? ['upload'] : ['sass:watch', 'pug:watch', 'serve'])