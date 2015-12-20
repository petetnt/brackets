/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, define, window, brackets, navigator */

/**
 * The bootstrapping module for brackets. This module sets up the require
 * configuration and loads the brackets module.
 */
require.config({
    nodeRequire: true,
    paths: {
        // The file system implementation. Change this value to use different
        // implementations (e.g. cloud-based storage).
        "fileSystemImpl"    : "filesystem/impls/appshell/AppshellFileSystem",
		
        // Third party dependencies
     
        "jquery":                    "../node_modules/jquery/dist/jquery",
        "less":                      "../node_modules/less/dist/less",
        "mustache":                  "../node_modules/mustache/mustache",
        "text":                      "../node_modules/text/text",
        "i18n":                      "../node_modules/i18n/i18n",
        "classnames":                "../node_modules/classnames/index",
        "react":                     "../node_modules/react/dist/react",
        "react-dom":                 "../node_modules/react-dom/dist/react-dom",
        "react-addons-test-utils":   "../node_modules/react-addons-test-utils/index",
        "immutable":                 "../node_modules/immutable/dist/immutable",
        "lodash":                    "../node_modules/lodash/index",
        "uuid":                      "../node_modules/node-uuid/uuid",
        "tinycolor":                 "../node_modules/tinycolor2/tinycolor",
        "jslint":                    "../node_modules/jslint/lib/jslint",
        "tern":                      "../node_modules/tern/lib/tern",
        "acorn":                     "../node_modules/acorn/dist/acorn",
        "acorn_loose":               "../node_modules/acorn/dist/acorn_loose",
        "semver.browser":            "../node_modules/semver/semver.browser",
        "connect":                   "../node_modules/connect",
        "connect":                   "../node_modules/mime/mime",
        "codemirror":                "../node_modules/codemirror"
    },
    shim: {
        "react-dom": {
            "deps": ["react"]
        }
    },
    map: {
        "*": {
            // Extensions might use the deprecated versions...
            "thirdparty/text":        "../node_modules/text/text",
            "thirdparty/i18n":        "../node_modules/i18n/i18n",
            "thirdparty/classnames":  "classnames",
            "thirdparty/react":       "react",
            "thirdparty/immutable":   "immutable",
            "thirdparty/lodash":      "lodash",
            "thirdparty/less":        "less",
            "thirdparty/mustache":    "mustache",
            "thirdparty/uuid":        "uuid",
            "thirdparty/tinycolor":   "tinycolor",
            "thirdparty/jslint":      "jslint",
            "thirdparty/tern":        "tern",
            "thirdparty/acorn":       "acorn",
            "thirdparty/acorn_loose": "acorn_loose",
            "thirdparty/CodeMirror2": "codemirror",
            "thirdparty/CodeMirror":  "codemirror"
        }
    }
});

if (window.location.search.indexOf("testEnvironment") > -1) {
    require.config({
        paths: {
            "preferences/PreferencesImpl": "../test/TestPreferencesImpl"
        },
        locale: "en" // force English (US)
    });
} else {
    /**
     * hack for r.js optimization, move locale to another config call
     *
     * Use custom brackets property until CEF sets the correct navigator.language
     * NOTE: When we change to navigator.language here, we also should change to
     * navigator.language in ExtensionLoader (when making require contexts for each
     * extension).
     */
    require.config({
        locale: window.localStorage.getItem("locale") || (typeof (brackets) !== "undefined" ? brackets.app.language : navigator.language)
    });
}

define(function (require) {
    "use strict";

    // Load compatibility shims--these need to load early, be careful moving this
    require(["jquery", "mustache", "less", "utils/Compatibility"], function (jQuery, Mustache, less) {
        // Load the brackets module. This is a self-running module that loads and runs the entire application.
        
        // These should be required instead of exposed as globals
        window.$ = window.jQuery = jQuery;
        window.Mustache = Mustache;
        window.less = less;
        
        require(["brackets"]);
    });
});
