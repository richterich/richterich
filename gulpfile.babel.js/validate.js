import { env } from 'process';
import { dev, production } from './config';
import { src } from 'gulp';
import validate from 'gulp-html';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
/**
 * Notification options
 */
const notifyOptions = {
    title: 'HTML',
    message: 'Error: <%= error.message %>'
};
/**
 * ? Set validation
 */
const validatorOptions = {
    'Werror': true,
    'verbose': true
};
/**
 * ? Validate built HTML files
 */
function validateTask() {
    const prod = env['NODE_ENV'] === 'production';
    const files = prod ? production.html : dev.html;
    return src(files)
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(validate(validatorOptions));
}

validateTask.displayName = 'validate';
validateTask.description = 'Validate built HTML files';

export default validateTask;