import { env } from 'process';
import { html, dev, production } from './config';
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import livereload from './livereload';
/**
 * Notification options
 */
 const notifyOptions = {
    title: 'HTML',
    message: 'Error: <%= error.message %>'
};
/**
 * Set minification options
 */
const htmlminOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true
};
/**
 * Set default destination root folder
 */
 const destOptions = {
    cwd: dev.dest
};
/**
 *  Build and minify HTML files.
 */
function htmlTask() {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src([html.src, html.ignore])
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(fileinclude())
        .pipe(htmlmin(htmlminOptions))
        .pipe(dest(html.dest, destOptions))
        .pipe(livereload.stream());
}

htmlTask.displayName = 'html';
htmlTask.description = 'Process HTML files';

export default htmlTask;