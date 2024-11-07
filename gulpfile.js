const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
let watch = require('glob-watcher');
const del = require('del');

// ファイルの変更
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const convertEncoding = require('gulp-convert-encoding');

// 画像圧縮 and 複製
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

// 引数の利用
const minimist = require('minimist');

// 作業ディレクトリの宣言

const jsFilename = 'index';
const origin_path = "./assets/";
const work_pash = "docs/";
const asset_path = './assets/images/';
const develop_path = './' + work_pash;
const staging_path = './' + work_pash;
const master_path = './master/' + work_pash;


const paths = {
  css: {
    src: origin_path + 'scss/**/*.scss',
    dest_dev: develop_path + 'css/',
    dest_stg: staging_path + 'css/',
    dest_master: master_path + 'css/'
  },
  js: {
    src: origin_path + 'ts/**/*.ts',
    compile_local: origin_path + 'compile_js/',
    dest_dev: develop_path + 'js/',
    dest_stg: staging_path + 'js/',
    dest_master: master_path + 'js/'
  },
  rep: {
    src: develop_path + 'parts/*.php',
    dest: staging_path + 'parts/',
    dest_master: master_path + 'parts/',
  },
  image: {
    asset_dev: develop_path + 'images/',
    dest_dev: develop_path + 'img/',
    dest_stg: staging_path + 'img/',
    dest_master: master_path + 'img/'
  }
}

//---------------------------------------------------
// CSS
//---------------------------------------------------
gulp.task('sass', () => {
  return gulp.src(paths.css.src)
    .pipe(sass({
      style: 'expanded',
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.css.dest_dev))
    .pipe(replace(/\/develop/gi, ''))
    .pipe(gulp.dest(paths.css.dest_stg))
  // .pipe(gulp.dest(paths.css.dest_master))
});

gulp.task('ts', () => {
  del([paths.js.compile_local + '*.js']);
  return gulp.src([paths.js.src, '!./node_modules/**'])
    .pipe(tsProject())
    .pipe(gulp.dest(paths.js.compile_local)).on('end', function () {
      gulp.src(paths.js.compile_local + '*.js')
        .pipe(concat(jsFilename + '.js'))
        .pipe(gulp.dest(paths.js.dest_dev))
        .pipe(gulp.dest(paths.js.dest_stg))
      // .pipe(gulp.dest(paths.js.dest_master))
    });
});

// ここいらんかもとりあえず残し
const options = minimist(process.argv.slice(2), {
  string: 'name',
  default: {
    path: 'index' // 引数の初期値
  }
});

// 文字列変換
gulp.task('rep', function (callback) {
  gulp.src(paths.rep.src)
    .pipe(replace(/<\?php \/\*target\*\/ \?>/gi, '<%= Constants.PATH_ROOT %>'))
    .pipe(replace(/<\?php .+? \?>/gi, ''))
    .pipe(replace(/<\?php \/\*.?/gi, ''))
    .pipe(replace(/\*\/ \?>/gi, ''))
    .pipe(replace(/\*\/\?>/gi, ''))
    .pipe(rename({
      extname: '.ascx'
    }))
    .pipe(convertEncoding({ to: 'utf8', stripBOM: true }))
    .pipe(gulp.dest(paths.rep.dest));
  callback();
});


function js_cp() {
  const js_path = paths.js.dest_dev + '*.js';
  return gulp.src(js_path)
    .pipe(gulp.dest(paths.js.dest_stg));
}
exports.task = js_cp;

function css_cp() {
  const path = paths.css.dest_dev + '*.css';
  return gulp.src(path)
    .pipe(gulp.dest(paths.css.dest_stg));
}
exports.task = css_cp;

function img_cp() {
  del([paths.image.dest_dev + '**'])
  del([paths.image.dest_stg + '**'])
  del([paths.image.dest_master + '**'])

  return gulp.src(asset_path + '*.{png,jpg,jpeg,gif,PNG,JPG,TPEG,GIF,svg}', { encoding: false })
    .pipe(imagemin([
      pngquant('65-80'),
      mozjpeg({
        quality: 80,
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(paths.image.dest_dev))
    .pipe(gulp.dest(paths.image.dest_stg))
    .pipe(gulp.dest(paths.image.dest_master))
}
exports.task = img_cp;
gulp.task('img_cp', gulp.series(img_cp));

gulp.task('copy', function () {
  return gulp.src(
    ['staging/**/**/**/*.*'],
    { base: 'staging' }
  ).pipe(gulp.dest('develop'));
});

gulp.task('master', function () {
  return gulp.src(
    ['staging/**/**/**/*.*'],
    { base: 'staging' }
  ).pipe(gulp.dest('master'));
});

gulp.task('watch', function () {
  gulp.watch(paths.css.src, gulp.task('sass'));
  gulp.watch(paths.js.src, gulp.task('ts'));
  gulp.watch(paths.rep.src, gulp.task('rep'));
});

// デプロイコマンド用
gulp.task('dep', gulp.series(js_cp, img_cp, css_cp));
