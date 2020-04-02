const gulp = require('gulp');// 引入gulp模块,生成gulp对象
const html = require('gulp-minify-html');//压缩html的插件
const css = require('gulp-minify-css');//压缩css的插件
const script = require('gulp-uglify');//压缩js的插件
//es6转es5的三个模块
const babel = require('gulp-babel');//主要
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//sass编译
//gulp-sass gulp-sourcemaps gulp-load-plugins
const sass = require('gulp-sass');
//引入生成.map文件模块
const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
const plugins = require('gulp-load-plugins')();//返回的是一个函数体。需要再次执行。
//gulp-watch监听模块
const watch = require('gulp-watch');
//gulp-imagemin图片压缩(png)
const imagemin = require('gulp-imagemin');


const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const fontName = 'Icons';


//2.html压缩
gulp.task('uglifyhtml', () => {
    return gulp.src('src/html/*.html')
        .pipe(html())//执行压缩
        .pipe(gulp.dest('dist/html/'));
});

//3.压缩css
gulp.task('uglifycss', () => {
    return gulp.src('src/style/*.css')
        .pipe(css())//执行压缩
        .pipe(gulp.dest('dist/style/'));
});

//4.压缩js
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({//先将es6转换成es5
            presets: ['es2015']//es2015->es6  es2016->es7...
        }))
        .pipe(script())//再执行压缩
        .pipe(gulp.dest('dist/script/'));
});

//5.编译sass,同时生成.map文件(.map调式文件)
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/sass/'));
});


//6.图片压缩插件-imagemin@6
//对png最大的压缩，其他的格式几乎压不动。
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())//执行压缩
        .pipe(gulp.dest('dist/img/'));
});

//7.监听插件-gulp-watch()
//任务名为default,直接gulp运行，默认任务名。
gulp.task('default', function () {
    watch(['src/html/*.html',  'src/sass/*.scss' ], gulp.parallel('uglifyhtml', 'compilesass'));
});


gulp.task('iconfont', function(){
    gulp.src(['src/fonts/iconfont/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'app/assets/css/templates/_icons.scss',
            targetPath: '../../css/_icons.scss',
            fontPath: '../../fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: fontName































        }))
        .pipe(gulp.dest('dist/fonts/iconsfont/'));
});











