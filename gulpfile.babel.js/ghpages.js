import { env } from 'process';
import { dev, production } from './config';
import ghpages from 'gh-pages';
/**
 * Publish options
 */
const ghOptions = {
    dotfiles: true,
    silent: true,
    user: {
        name: 'github-actions-bot',
        email: 'support+actions@github.com'
    }
};
/**
 * @param {Undertaker.TaskFunction} done 
 */
function ghpagesTask(done) {
    const prod = env['NODE_ENV'] === 'production';
    const dir = prod ? production.dest : dev.dest;
    ghpages.publish(dir, ghOptions, (err) => {
        done(err);
    });
}

ghpagesTask.displayName = 'gh-pages';
ghpagesTask.description = 'Commit distribution files to \"gh-pages\" branch';

export default ghpagesTask;