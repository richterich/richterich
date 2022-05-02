import { env } from 'process';
import { dev, production } from './config';
import { src, dest } from 'gulp';
/**
 * Set default destination root folder
 */
const destOptions = {
    cwd: dev.dest
};
/**
 * Copy files from source to destination
 */
function copyTask(source, destination) {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src(source).pipe(dest(destination, destOptions));
}

copyTask.displayName = 'copy';
copyTask.description = 'Copy files from source to destination';

export default copyTask;