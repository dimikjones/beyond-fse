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
  const beyondFseNavSubmenuBehavior = {
    /**
     * Initialize the navigation logic
     */
    init: function () {
      // Run on load
      this.adjustBehavior();

      // Run on resize with debouncing
      window.addEventListener('resize', this.debounce(() => {
        this.adjustBehavior();
      }, 250));
    },
    /**
     * Adjust navigation behavior based on screen size
     */
    adjustBehavior: function () {
      const isDesktop = window.innerWidth > 1024;
      const navItems = document.querySelectorAll('.wp-block-navigation .has-child');
      navItems.forEach(item => {
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
    debounce: function (func, wait) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // Fire it off when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
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