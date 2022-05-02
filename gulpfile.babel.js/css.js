import { env } from 'process';
import { css, dev, production } from './config';
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import livereload from './livereload';
/**
 * Notification options
 */
const notifyOptions = {
    title: 'CSS',
    message: 'Error: <%= error.message %>'
};
/**
 * Set sass compiler
 */
const sass = gulpSass(dartSass);
/**
 * Minify compiled CSS
 */
const sassOptions = {
    outputStyle: 'compressed'
};
/**
 * Set extension for output file
 */
const renameOptions = {
    extname: '.min.css'
};
/**
 * Register plugins
 */
const plugins = [
    autoprefixer,
    cssnano
];
/**
 * Set default destination root folder
 */
const destOptions = {
    cwd: dev.dest
};
/**
 * Process and minify scss files to one css file.
 */
function cssTask() {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src([css.src, css.ignore])
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(sass(sassOptions))
        .pipe(postcss(plugins))
        .pipe(rename(renameOptions))
        .pipe(dest(css.dest, destOptions))
        .pipe(livereload.stream());
}

cssTask.displayName = 'css';
cssTask.description = 'Process both SCSS & CSS files';

export default cssTask;