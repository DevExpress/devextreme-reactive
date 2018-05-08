'use strict';

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @format
 */

var Yoga = require('./entry-common');
var nbind = require('nbind');

var _nbind$init = nbind.init(__dirname + '/../'),
    bind = _nbind$init.bind,
    lib = _nbind$init.lib;

module.exports = Yoga(bind, lib);