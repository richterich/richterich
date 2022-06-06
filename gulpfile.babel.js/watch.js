import livereload from './livereload';
import { dev, watch as watchDir } from './config';
import { watch, series } from 'gulp';
/**
 * Start development server and bind src directories to wath for changes
 */
function watchTask() {
    /**
     * Start dev server
     */
    livereload.init({
        notify: false,
        logPrefix: 'DEV SERVER',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: [dev.dest],
        port: 8080
    });
    let time = new Date().toTimeString().substring(0, 8);
    console.info(`[\x1b[90m${time}\x1b[0m] \x1b[36m%s\x1b[0m`, 'Start development server');
    /**
     * Update file in dest directory & reload dev server
     */
    watch(watchDir.html, series('html', 'validate'));
    watch(watchDir.css, series('css'));
    watch(watchDir.images, series('images'));
    watch(watchDir.favs, series('favs'));
    time = new Date().toTimeString().substring(0, 8);
    console.info(`[\x1b[90m${time}\x1b[0m] \x1b[36m%s\x1b[0m`, 'Start watching the files');
}

watchTask.displayName = 'watch';
watchTask.description = 'Start dev-server & Watch for the source changes and update the dev-build directory';

export default watchTask;