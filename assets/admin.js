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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Modifies wp editor by unregistering some blocks styles.
 * We wrap it in wp.domReady to ensure the blocks API is loaded.
 */
wp.domReady(function () {
  if (wp.blocks && wp.blocks.unregisterBlockStyle) {
    wp.blocks.unregisterBlockStyle("core/button", "outline");
    wp.blocks.unregisterBlockStyle("core/quote", "plain");
    wp.blocks.unregisterBlockStyle("core/separator", "dots");
    wp.plugins.unregisterPlugin("block-directory");
  }
});

// Filter to register the new 'displayIcon', 'leftIcon', and 'iconName' attributes and attach classes on save.
wp.hooks.addFilter("blocks.registerBlockType", "beyond-fse/button-extension-attributes", function (settings) {
  if (settings.name !== "core/button") {
    return settings;
  }

  // Add the new attributes
  if (!settings.attributes) {
    settings.attributes = {};
  }
  settings.attributes.displayIcon = {
    type: "boolean",
    "default": false
  };
  settings.attributes.leftIcon = {
    type: "boolean",
    "default": false
  };
  settings.attributes.iconName = {
    type: "string",
    "default": ""
  };

  // Override the save function to add the appropriate classes
  var originalSave = settings.save;
  settings.save = function (props) {
    var wrapperProps = originalSave(props);
    var _props$attributes = props.attributes,
      displayIcon = _props$attributes.displayIcon,
      leftIcon = _props$attributes.leftIcon,
      iconName = _props$attributes.iconName;
    if (displayIcon) {
      var classes = [];

      // Always add 'has-icon' when displayIcon is true
      classes.push('has-icon');

      // Add 'icon-left' if leftIcon is true
      if (leftIcon) {
        classes.push('icon-left');
      }

      // Add 'has-icon-${iconName}' if iconName is not empty
      if (iconName && iconName.trim() !== '') {
        classes.push("has-icon-".concat(iconName));
      }
      if (classes.length > 0) {
        var newClassName = wrapperProps.props.className ? "".concat(wrapperProps.props.className, " ").concat(classes.join(' ')) : classes.join(' ');

        // Note: This relies on the core block's save implementation
        // accepting the className on the wrapper (which core/button does).
        wrapperProps.props.className = newClassName;
      }
    }
    return wrapperProps;
  };
  return settings;
});

// Filter to add the 'Display Icon' toggle control and additional icon settings to the editor sidebar.
wp.hooks.addFilter("editor.BlockEdit", "beyond-fse/button-extension-controls", wp.compose.createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    if (props.name !== "core/button") {
      return /*#__PURE__*/React.createElement(BlockEdit, props);
    }
    var attributes = props.attributes,
      setAttributes = props.setAttributes;
    var displayIcon = attributes.displayIcon,
      leftIcon = attributes.leftIcon,
      iconName = attributes.iconName;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__("Icon Settings", "beyond-fse"),
      initialOpen: false // Changed to false to keep it tidy
    }, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: wp.i18n.__("Display Icon", "beyond-fse"),
      checked: displayIcon,
      onChange: function onChange(value) {
        return setAttributes({
          displayIcon: value
        });
      }
    }), displayIcon && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: wp.i18n.__("Left Icon", "beyond-fse"),
      checked: leftIcon,
      onChange: function onChange(value) {
        return setAttributes({
          leftIcon: value
        });
      },
      help: wp.i18n.__("Display icon on the left side", "beyond-fse")
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: wp.i18n.__("Icon Type", "beyond-fse"),
      value: iconName,
      options: [{
        label: wp.i18n.__("None", "beyond-fse"),
        value: ""
      }, {
        label: wp.i18n.__("Arrow", "beyond-fse"),
        value: "arrow"
      }, {
        label: wp.i18n.__("Plus", "beyond-fse"),
        value: "plus"
      }, {
        label: wp.i18n.__("Link", "beyond-fse"),
        value: "link"
      }, {
        label: wp.i18n.__("Tag", "beyond-fse"),
        value: "tag"
      }],
      onChange: function onChange(value) {
        return setAttributes({
          iconName: value
        });
      },
      help: wp.i18n.__("Select the icon to display", "beyond-fse")
    })))));
  };
}, "withIconControl"));

// Filter to add the icon classes to the block wrapper in the editor.
wp.hooks.addFilter("editor.BlockListBlock", "beyond-fse/button-extension-editor-class", wp.compose.createHigherOrderComponent(function (BlockListBlock) {
  return function (props) {
    var name = props.name,
      attributes = props.attributes;
    if (name !== "core/button") {
      return /*#__PURE__*/React.createElement(BlockListBlock, props);
    }
    var displayIcon = attributes.displayIcon,
      leftIcon = attributes.leftIcon,
      iconName = attributes.iconName;
    var newClassName = props.className;
    if (displayIcon) {
      var classes = [];

      // Always add 'has-icon' when displayIcon is true
      classes.push('has-icon');

      // Add 'icon-left' if leftIcon is true
      if (leftIcon) {
        classes.push('icon-left');
      }

      // Add 'has-icon-${iconName}' if iconName is not empty
      if (iconName && iconName.trim() !== '') {
        classes.push("has-icon-".concat(iconName));
      }
      if (classes.length > 0) {
        newClassName = newClassName ? "".concat(newClassName, " ").concat(classes.join(' ')) : classes.join(' ');
      }
    }
    return /*#__PURE__*/React.createElement(BlockListBlock, _extends({}, props, {
      className: newClassName
    }));
  };
}, "withIconEditorClass"));
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