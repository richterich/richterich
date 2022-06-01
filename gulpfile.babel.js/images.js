import { env } from 'process';
import { images, dev, production } from './config';
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
/**
 * Notification options
 */
const notifyOptions = {
    title: 'IMAGES',
    message: 'Error: <%= error.message %>'
};
/**
 * Set plugins output
 */
const imageminOptions = {
    verbose: true,
    silent: false
};
/**
 * Register plugins
 */
const plugins = [
    gifsicle({ interlaced: true }),
    mozjpeg({ quality: 40, progressive: true }),
    optipng({ optimizationLevel: 5 }),
    svgo({
        plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
        ]
    })
];
/**
 * Set default destination root folder
 */
const destOptions = {
    cwd: dev.dest
};
/**
 * Minify PNG, JPG, JPEG, GIF, SVG images
 */
function imagesTask() {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src(images.src)
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(imagemin(plugins, imageminOptions))
        .pipe(dest(images.dest, destOptions));
}

imagesTask.displayName = 'images';
imagesTask.description = 'Process images PNG, JPG, JPEG, GIF, SVG with imagemin';

export default imagesTask;