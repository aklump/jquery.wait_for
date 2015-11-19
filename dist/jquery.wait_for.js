/**
 * Wait For (an Element) jQuery JavaScript Plugin v0.1
 * http://www.intheloftstudios.com/packages/js/wait_for
 *
 * Wait for an element to be ready on a page and fire a callback.
 *
 * Copyright 2015, Aaron Klump <sourcecode@intheloftstudios.com>
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Thu Nov 19 07:50:27 PST 2015
 */

/**
 * Instantiate this plugin thus:
 * @code
    $(document).waitFor('.some-element', function () {
      console.log('ready');
    }, function () {
      console.log('fail');
    });
 * @endcode
 *
 * You may also pass an object as to affect more options:
 * @code
    $(document).waitFor({
      selector: '.some-element',
      expectedLength: 2,
      maxWait: 2000,
      onReady: function () {
        console.log('ready');
      },
      onFail: function () {
        console.log('fail');
      }
    });
 * @endcode
 * 
 */
;(function($, window) {
"use strict";

$.fn.waitFor = function() {
  var _ = this,
      settings,
      elapsed = 0,
      interval,
      ret;

  var options =  {
    selector: '',
    expectedLength: 1,
    maxWait: 500,
    onReady: null,
    onFail: null,
    pollInterval: 20,
  };

  if (typeof arguments[0] === 'string') {
    settings = {
      selector: arguments[0],
      onReady: arguments[1],
      onFail: arguments[2],
    };
  }
  else {
    settings = arguments[0];
  }

  settings = $.extend({}, options, settings);

  if (!settings.selector) {
    throw "settings.selector may not be empty";
  }

  interval = window.setInterval(function () {
    // if (_.length === settings.expectedLength) {
    if ($(settings.selector).length === settings.expectedLength) {
      clearInterval(interval);
      ret = settings.onReady instanceof Function ? settings.onReady() : null;
    }
    else if ((elapsed += settings.pollInterval) > settings.maxWait) {
      clearInterval(interval);
      ret = settings.onFail instanceof Function ? settings.onFail() : null;
    }
  }, settings.pollInterval);

  return _;   
};

/**
 * Returns the waitFor version.
 *
 * @return {string}
 */
$.fn.waitFor.version = function() { return '0.1'; };

})(jQuery, window);