/**
 * Wait For (an Element) jQuery JavaScript Plugin v0.1.2
 * http://www.intheloftstudios.com/packages/js/jquery.wait_for
 *
 * Wait for an element to be ready on a page and fire a callback.
 *
 * Copyright 2015, Aaron Klump <sourcecode@intheloftstudios.com>
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Thu Nov 19 07:57:38 PST 2015
 */

/**
 * Instantiate this plugin thus:
 * @code
    $(document).waitFor('.some-element', function ($el) {
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
      onReady: function ($el) {
        console.log('ready');
      },
      onFail: function ($el) {
        console.log('fail');
      }
    });
 * @endcode
 *
 * onReady callbacks receive the jQuery object made from the selector and an
 * object which has elapsed time, settings, etc.
 */
;(function($, window) {
"use strict";

$.fn.waitFor = function() {
  var _ = this,
      settings,
      interval,
      $el,
      ret;

  var info = {
    elapsed: 0
  };

  var options =  {
    selector: '',
    expectedLength: 1,
    maxWait: 750,
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
    $el = _.find(settings.selector);
    if ($el.length === settings.expectedLength) {
      clearInterval(interval);
      ret = settings.onReady instanceof Function ? settings.onReady($el, $.extend(info, {settings: settings})) : null;
    }
    else if ((info.elapsed += settings.pollInterval) > settings.maxWait) {
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
$.fn.waitFor.version = function() { return '0.1.2'; };

})(jQuery, window);