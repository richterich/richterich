import { env } from 'process';
import { dev, production } from './config';
import ghpages from 'gh-pages';
/**
 * Publish options
 */
const ghOptions = {
    dotfiles: true
};
/**
 * @param {Undertaker.TaskFunction} done 
 */
function ghpagesTask(done) {
    const prod = env['NODE_ENV'] === 'production';
    const dir = prod ? production.dest : dev.dest;
    ghpages.publish(dir, ghOptions, (err) => {
        if (err) console.error(err);
        done();
    });
}

ghpagesTask.displayName = 'gh-pages';
ghpagesTask.description = 'Commit distribution files to \"gh-pages\" branch';

export default ghpagesTask;