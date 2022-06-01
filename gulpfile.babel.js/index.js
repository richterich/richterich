import { series, parallel } from 'gulp';
import argvTask from './argv';
import ghpagesTask from './ghpages.js';
import cleanTask from "./clean";
import copyTask from './copy';
import { minifyTask, webpTask } from './images';
import htmlTask from './html';
import cssTask from './css';
import validateTask from './validate';
import watchTask from './watch';
import { favs, ghpages } from './config';

const copyFavs = () => copyTask(favs.src, favs.dest);
copyFavs.description = 'Copy favicons';

const copyGh = () => copyTask(ghpages.src, ghpages.dest);
copyGh.displayName = 'copy-gh';
copyGh.description = 'Copy gh-pages file to the root folder';

const devTask = done => series('build', 'watch')(done);
devTask.description = 'Run development environment (build poject, start server, watch files)';

const parallelList = [htmlTask, cssTask, minifyTask, webpTask, copyFavs];

const buildTask = series(argvTask, parallel(parallelList), validateTask);
buildTask.description = 'Build entire project';
buildTask.flags = { '--prod': 'Builds in production mode (minification, uglification, etc)' };

const deployTask = done => series('build', 'copy-gh', 'gh-pages')(done);
deployTask.description = 'Deploy project to GitHub Pages ((build poject, copy gh files, commit to branch))';
deployTask.flags = { '--prod': 'Builds in production mode (minification, uglification, etc)' };

const defaultTask = done => series('clean', 'build')(done);
defaultTask.description = 'Cleans generated files & Builds in development mode';
defaultTask.flags = { '--prod': 'Builds in production mode (minification, uglification, etc)' };
/** 
 * Export tasks to gulp with a name to call
*/
export { deployTask as deploy };
export { ghpagesTask as ghpages };
export { cleanTask as clean };
export { copyFavs as favs };
export { copyGh as copygh };
export { minifyTask as images };
export { webpTask as webp };
export { htmlTask as html };
export { cssTask as css };
export { validateTask as validate };
export { watchTask as watch };
export { buildTask as build };
export { devTask as dev };
export default defaultTask;