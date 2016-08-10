const config    = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const gulp      = require('gulp')
const sass      = require('gulp-sass')
const pug       = require('gulp-pug')
const s3        = require('gulp-s3-upload')(config)

gulp.task('render-blog', function() {
  return  gulp.src('./development/blog/*.pug')
    .pipe(pug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./production/blog/'))
})

gulp.task('render-includes', function() {
  return  gulp.src('./development/includes/*.pug')
    .pipe(pug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./production/'))
})

gulp.task('sass', function () {
  return gulp.src('./development/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./production/resources/css/'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./development/sass/*.scss', ['sass']);
// });

gulp.task("upload", ['render-blog', 'render-includes', 'sass'], function() {
  return  gulp.src("./production/")
    .pipe(s3({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ACL:    'public-read'
    }, 
    {
      maxRetries: 5
    }))
})



gulp.task('default', ['upload'])