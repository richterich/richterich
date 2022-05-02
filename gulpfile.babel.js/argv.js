import { env, argv } from 'process';
/**
 * Handle GULP argumets
 * @param {Undertaker.TaskFunction} done 
 */
function argvTask(done) {
    const production = argv.includes('--prod');
    if (production) env['NODE_ENV'] = 'production';
    done();
}

argvTask.displayName = 'args';
argvTask.description = 'Read task arguments';

export default argvTask;