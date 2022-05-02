import { env } from 'process';
import { dev, production } from './config';
import del from 'del';
/**
 * Delete destination directory
 */
function cleanTask() {
    const prod = env['NODE_ENV'] === 'production';
    const directory = prod ? production.dest : dev.dest;
    return del(directory);
}

cleanTask.displayName = 'clean';
cleanTask.description = 'Cleans up generated files';

export default cleanTask;