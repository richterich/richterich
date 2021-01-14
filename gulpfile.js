'use strict';

const { series, parallel, watch, src, dest } = require('gulp');
const gulp_sass = require('gulp-sass');
const gulp_pug = require('gulp-pug');
const gulp_data = require('gulp-data');
const clean = require('gulp-rimraf');
const gulp_rename = require('gulp-rename');
const compress_imgs = require('gulp-imagemin');
const path = require('path');
const fs = require('fs');

const build_folder = './build';
const source_folder = './src';

const paths = {
    build: {
        root_PATH: build_folder + '/',
        css_PATH: build_folder + '/static/css',
        assets_PATH: build_folder + '/static/assets'
    },
    pack:{
        root_PATH: build_folder + '/',
        css_PATH: build_folder + '/css',
        assets_PATH: build_folder + '/assets'
    },
    sources: {
        templates_PATH: source_folder + '/',
        templates: source_folder + '/**/*.pug',
        options: source_folder + '/**/*.json',
        scss: [source_folder + '/scss/*.scss', '!' + source_folder + '/scss/_*.scss'],
        images: source_folder + '/assets/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    watch: {
        templates: source_folder + '/**/*.pug',
        options: source_folder + '/**/*.json',
        scss: source_folder + '/scss/*.scss',
        images: source_folder + '/assets/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    built_in: build_folder + '/*'
}

function doClean() {
    return src(paths.built_in, { read: false })
        .pipe(clean());
}

function buildHTML() {
    return src(paths.sources.templates)
        .pipe(gulp_data(file => {
            return JSON.parse(
                fs.readFileSync(
                    paths.sources.templates_PATH + path.basename(file.path, '.pug') + '.json'
                ));
        }))
        .pipe(gulp_pug({
            verbose: true,
            client: false,
        }))
        .pipe(dest(paths.build.root_PATH));
}

function packTemplates() {
    return src(paths.sources.templates)
        .pipe(dest(paths.pack.root_PATH));
}

function packOptions() {
    return src(paths.sources.options)
        .pipe(dest(paths.pack.root_PATH));
}

function buildCSS() {
    return src(paths.sources.scss)
        .pipe(gulp_sass({
            outputStyle: "compressed"
        }).on('error', gulp_sass.logError))
        .pipe(gulp_rename({ extname: '.min.css' }))
        .pipe(dest(paths.build.css_PATH));
}

function packCSS() {
    return src(paths.sources.scss)
        .pipe(gulp_sass({
            outputStyle: "compressed"
        }).on('error', gulp_sass.logError))
        .pipe(gulp_rename({ extname: '.min.css' }))
        .pipe(dest(paths.pack.css_PATH));
}

function buildImages() {
    return src(paths.sources.images)
        .pipe(compress_imgs([
                compress_imgs.mozjpeg({
                    quality: 70,
                    progressive: true
                })
            ],
            { verbose: true }
        ))
        .pipe(dest(paths.build.assets_PATH));
}

function packImages() {
    return src(paths.sources.images)
        .pipe(compress_imgs([
                compress_imgs.mozjpeg({
                    quality: 70,
                    progressive: true
                })
            ],
            { verbose: true }
        ))
        .pipe(dest(paths.pack.assets_PATH));
}

function copyFavicon() {
    return src(source_folder + '/favicon.ico')
        .pipe(dest(paths.build.root_PATH));
}

function doWatch(params) {
    watch([paths.watch.scss], buildCSS(paths.build.css_PATH));
    watch([paths.watch.templates], buildHTML);
    watch([paths.watch.options], buildHTML);
    watch([paths.watch.images], buildImages(paths.build.assets_PATH));
}

exports.clean = doClean;
exports.watch = doWatch;
exports.build = series(doClean, parallel(copyFavicon, buildImages, buildCSS, buildHTML));
exports.pack = series(doClean, parallel(copyFavicon, packImages, packCSS, packOptions, packTemplates));
