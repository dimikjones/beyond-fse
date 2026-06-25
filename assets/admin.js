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
/*!******************************************!*\
  !*** ./src/js/admin/beyond-fse-admin.js ***!
  \******************************************/
/**
 * Author Name Heading Tag functionality
 * Adds tagName attribute to core/post-author-name block
 */
wp.hooks.addFilter("blocks.registerBlockType", "beyond-fse/author-name-tag-attribute", (settings, name) => {
  if (name !== "core/post-author-name") {
    return settings;
  }

  // Add tagName attribute
  if (!settings.attributes) {
    settings.attributes = {};
  }
  settings.attributes.tagName = {
    type: "string",
    default: "div"
  };
  return settings;
});

/**
 * Author Name Heading Tag UI Control
 * Adds tagName selector to core/post-author-name block settings
 */
wp.hooks.addFilter("editor.BlockEdit", "beyond-fse/author-name-tag-control", wp.compose.createHigherOrderComponent(BlockEdit => {
  return props => {
    if (props.name !== "core/post-author-name") {
      return /*#__PURE__*/React.createElement(BlockEdit, props);
    }
    const {
      attributes,
      setAttributes
    } = props;
    const {
      tagName
    } = attributes;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__("Heading Tag", "beyond-fse"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: wp.i18n.__("Tag Name", "beyond-fse"),
      value: tagName || "div",
      options: [{
        label: wp.i18n.__("Div", "beyond-fse"),
        value: "div"
      }, {
        label: wp.i18n.__("Heading 1", "beyond-fse"),
        value: "h1"
      }, {
        label: wp.i18n.__("Heading 2", "beyond-fse"),
        value: "h2"
      }, {
        label: wp.i18n.__("Heading 3", "beyond-fse"),
        value: "h3"
      }, {
        label: wp.i18n.__("Heading 4", "beyond-fse"),
        value: "h4"
      }, {
        label: wp.i18n.__("Heading 5", "beyond-fse"),
        value: "h5"
      }, {
        label: wp.i18n.__("Heading 6", "beyond-fse"),
        value: "h6"
      }],
      onChange: value => setAttributes({
        tagName: value
      }),
      help: wp.i18n.__("Select the HTML tag for the author name", "beyond-fse"),
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true
    }))));
  };
}, "withAuthorNameTagControl"));
})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************************************!*\
  !*** ./src/scss/admin/beyond-fse-admin.scss ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=admin.js.map