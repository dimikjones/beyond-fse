/******/ (() => { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
/*!************************************!*\
  !*** ./src/js/front/beyond-fse.js ***!
  \************************************/
(function () {
  'use strict';

  /**
   * Create a namespace for the object.
   */
  var beyondFseNavSubmenuBehavior = {
    /**
     * Initialize the navigation logic
     */
    init: function init() {
      var _this = this;
      // Run on load
      this.adjustBehavior();

      // Run on resize with debouncing
      window.addEventListener('resize', this.debounce(function () {
        _this.adjustBehavior();
      }, 250));
    },
    /**
     * Adjust navigation behavior based on screen size
     */
    adjustBehavior: function adjustBehavior() {
      var isDesktop = window.innerWidth > 1024;
      var navItems = document.querySelectorAll('.wp-block-navigation .has-child');
      navItems.forEach(function (item) {
        if (isDesktop) {
          item.classList.remove('open-on-click');
        } else {
          item.classList.add('open-on-click');
        }
      });
    },
    /**
     * Utility: Debounce
     */
    debounce: function debounce(func, wait) {
      var timeout;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var later = function later() {
          clearTimeout(timeout);
          func.apply(void 0, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // Fire it off when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Check if block navigation behavior is enabled via body class
    if (!document.body.classList.contains('has-beyond-fse-block-nav-behavior')) {
      return;
    }
    beyondFseNavSubmenuBehavior.init();
  });
})();
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./src/scss/front/beyond-fse.scss ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=front.js.map