'use strict';

const _ = require('underscore');
const ePackager = require('electron-packager');

/**
 * Prepares options and initiates build depending on architecture.
 *
 * @param {Gulp} gulp the gulp import
 * @param {{author: string, name: string,
 * version: string, main: string}} packageJson package.json file contents
 */
module.exports = function (gulp, packageJson) {

    const RELEASE_SETTINGS = {
        dir: '.',
        name: packageJson.name,
        out: 'release',
        'appVersion': packageJson.version,
        'appCopyright': 'Copyright (c) 2019 ' + packageJson.author,
        'version-string': {
            ProductName : packageJson.name,
            CompanyName: packageJson.author,
            FileDescription: packageJson.name,
            OriginalFilename: packageJson.name + '.exe',
            ProductVersion : packageJson.version,
            'file-version': packageJson.version,
            'product-version': packageJson.version,
            LegalCopyright: 'Copyright (c) 2019 ' + packageJson.author
        },
        win32metadata : {
            ProductName : packageJson.name,
            CompanyName: packageJson.author,
            FileDescription: packageJson.name,
            OriginalFilename: packageJson.name + '.exe',
            ProductVersion : packageJson.version,
            'file-version': packageJson.version,
            'product-version': packageJson.version,
            LegalCopyright: 'Copyright (c) 2019 ' + packageJson.author
        },
        ignore : /.idea|release|resources|tasks|.gitignore|.eslintrc.json|gulpfile.js|screenshot.png|README.md|CHANGELOG.md$/,
        appPath : packageJson.main,
        overwrite: true,
        asar: true,
        prune: true
    };

    gulp.task('pack-linux', (next) => {
        ePackager(_.extend(RELEASE_SETTINGS, {
            platform: 'linux',
            arch: 'x64'
        }), next);
    });

    gulp.task('pack-windows', (next) => {
        ePackager(_.extend(RELEASE_SETTINGS, {
            platform: 'win32',
            arch: 'x64',
            icon: 'resources/icons/kongdash-256x256.ico'
        }), next);
    });

    gulp.task('pack-osx', (next) => {
        ePackager(_.extend(RELEASE_SETTINGS, {
            appBundleId: 'io.kongdash',
            platform: 'darwin',
            arch: 'all',
            icon: 'resources/icons/kongdash-256x256.icns'
        }), next);
    });
};
