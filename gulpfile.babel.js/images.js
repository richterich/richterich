import { env } from 'process';
import { images, dev, production } from './config';
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webp from 'gulp-webp';
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
 * WebP options
 */
const webpOptions = {
    quality: 40,
    method: 6
}
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
function minifyTask() {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src(images.srcMinify)
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(imagemin(plugins, imageminOptions))
        .pipe(dest(images.dest, destOptions));
}

minifyTask.displayName = 'images';
minifyTask.description = 'Minify images PNG, JPG, JPEG, GIF, SVG with imagemin';
/**
 * Convert PNG, JPG, JPEG, GIF images to WebP format
 */
function webpTask() {
    const prod = env['NODE_ENV'] === 'production';
    destOptions.cwd = prod ? production.dest : dev.dest;
    return src(images.srcConvert)
        .pipe(plumber(notify.onError(notifyOptions)))
        .pipe(webp(webpOptions))
        .pipe(dest(images.dest, destOptions));
}

webpTask.displayName = 'webp';
webpTask.description = 'Convert PNG, JPG, JPEG, GIF images to WebP format';

export { minifyTask, webpTask };