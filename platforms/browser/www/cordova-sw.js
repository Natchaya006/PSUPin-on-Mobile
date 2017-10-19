/**
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
'License'); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

// Note, these will be updated automatically at build time
var CACHE_VERSION = '1508424427725';
var CACHE_LIST = [
    "/config.xml",
    "/cordova-sw.js",
    "/cordova.js",
    "/cordova_plugins.js",
    "/css/font_awesome/css/font-awesome.css",
    "/css/font_awesome/css/font-awesome.min.css",
    "/css/font_awesome/fonts/fontawesome-webfont.eot",
    "/css/font_awesome/fonts/fontawesome-webfont.svg",
    "/css/font_awesome/fonts/fontawesome-webfont.ttf",
    "/css/font_awesome/fonts/fontawesome-webfont.woff",
    "/css/font_awesome/fonts/fontawesome-webfont.woff2",
    "/css/font_awesome/fonts/FontAwesome.otf",
    "/css/ionicons/css/ionicons.css",
    "/css/ionicons/css/ionicons.min.css",
    "/css/ionicons/fonts/ionicons.eot",
    "/css/ionicons/fonts/ionicons.svg",
    "/css/ionicons/fonts/ionicons.ttf",
    "/css/ionicons/fonts/ionicons.woff",
    "/css/material-design-iconic-font/css/material-design-iconic-font.css",
    "/css/material-design-iconic-font/css/material-design-iconic-font.min.css",
    "/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.eot",
    "/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.svg",
    "/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf",
    "/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff",
    "/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2",
    "/css/onsen-css-components.css",
    "/css/onsen-css-components.min.css",
    "/css/onsenui.css",
    "/css/onsenui.min.css",
    "/css/preview.html",
    "/css/style.css",
    "/favicon.ico",
    "/img/pic.jpg",
    "/index.html",
    "/js/angular-onsenui.js",
    "/js/angular-onsenui.min.js",
    "/js/jquery-3.2.1.min.js",
    "/js/onsenui.d.ts",
    "/js/onsenui.js",
    "/js/onsenui.min.js",
    "/js/script.js",
    "/json/db.json",
    "/manifest.json",
    "/plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
    "/plugins/cordova-plugin-camera/www/Camera.js",
    "/plugins/cordova-plugin-camera/www/CameraConstants.js",
    "/plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
    "/README.md"
];

this.addEventListener('install', function (event) {
    // Perform install steps
    console.log('cordova service worker is installing.');
    event.waitUntil(caches.open(CACHE_VERSION) /* eslint no-undef : 0 */
        .then(function (cache) {
            return cache.addAll(CACHE_LIST);
        }));
});

this.addEventListener('activate', function (event) {
    // Perform activate steps
    console.log('cordova service worker is activated.');
});

this.addEventListener('fetch', function (event) {
    console.log('cordova service worker : fetch : ' + event.request.url);

    event.respondWith(caches.match(event.request).then(function (response) { /* eslint no-undef : 0 */
        // Cache hit? return response else fetch it
        return response || fetch(event.request); /* eslint no-undef : 0 */
    }));
});
