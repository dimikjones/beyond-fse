/**
 * Modifies wp editor by unregistering some blocks styles.
 * We wrap it in wp.domReady to ensure the blocks API is loaded.
 */
wp.domReady(() => {
  if (wp.blocks && wp.blocks.unregisterBlockStyle) {
    wp.blocks.unregisterBlockStyle("core/button", "outline");
    wp.blocks.unregisterBlockStyle("core/quote", "plain");
    wp.blocks.unregisterBlockStyle("core/separator", "dots");
    wp.plugins.unregisterPlugin("block-directory");
  }
});

// Filter to register the new 'displayIcon', 'leftIcon', and 'iconName' attributes and attach classes on save.
wp.hooks.addFilter(
  "blocks.registerBlockType",
  "beyond-fse/button-extension-attributes",
  (settings) => {
    if (settings.name !== "core/button") {
      return settings;
    }

    // Add the new attributes
    if (!settings.attributes) {
      settings.attributes = {};
    }
    settings.attributes.displayIcon = {
      type: "boolean",
      default: false,
    };
    settings.attributes.leftIcon = {
      type: "boolean",
      default: false,
    };
    settings.attributes.iconName = {
      type: "string",
      default: "",
    };

    // Override the save function to add the appropriate classes
    const originalSave = settings.save;
    settings.save = (props) => {
      const wrapperProps = originalSave(props);
      const { displayIcon, leftIcon, iconName } = props.attributes;

      if (displayIcon) {
        let classes = [];
        
        // Always add 'has-icon' when displayIcon is true
        classes.push('has-icon');
        
        // Add 'icon-left' if leftIcon is true
        if (leftIcon) {
          classes.push('icon-left');
        }
        
        // Add 'has-icon-${iconName}' if iconName is not empty
        if (iconName && iconName.trim() !== '') {
          classes.push(`has-icon-${iconName}`);
        }
        
        if (classes.length > 0) {
          const newClassName = wrapperProps.props.className
            ? `${wrapperProps.props.className} ${classes.join(' ')}`
            : classes.join(' ');

          // Note: This relies on the core block's save implementation
          // accepting the className on the wrapper (which core/button does).
          wrapperProps.props.className = newClassName;
        }
      }
      return wrapperProps;
    };

    return settings;
  }
);

// Filter to add the 'Display Icon' toggle control and additional icon settings to the editor sidebar.
wp.hooks.addFilter(
  "editor.BlockEdit",
  "beyond-fse/button-extension-controls",
  wp.compose.createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      if (props.name !== "core/button") {
        return <BlockEdit {...props} />;
      }

      const { attributes, setAttributes } = props;
      const { displayIcon, leftIcon, iconName } = attributes;

      return (
        <>
          <BlockEdit {...props} />
          <wp.blockEditor.InspectorControls>
            <wp.components.PanelBody
              title={wp.i18n.__("Icon Settings", "beyond-fse")}
              initialOpen={false} // Changed to false to keep it tidy
            >
              <wp.components.ToggleControl
                label={wp.i18n.__("Display Icon", "beyond-fse")}
                checked={displayIcon}
                onChange={(value) => setAttributes({ displayIcon: value })}
              />
              
              {displayIcon && (
                <>
                  <wp.components.ToggleControl
                    label={wp.i18n.__("Left Icon", "beyond-fse")}
                    checked={leftIcon}
                    onChange={(value) => setAttributes({ leftIcon: value })}
                    help={wp.i18n.__("Display icon on the left side", "beyond-fse")}
                  />
                  
                  <wp.components.SelectControl
                    label={wp.i18n.__("Icon Type", "beyond-fse")}
                    value={iconName}
                    options={[
                      { label: wp.i18n.__("None", "beyond-fse"), value: "" },
                      { label: wp.i18n.__("Arrow", "beyond-fse"), value: "arrow" },
                      { label: wp.i18n.__("Plus", "beyond-fse"), value: "plus" },
                      { label: wp.i18n.__("Link", "beyond-fse"), value: "link" },
                      { label: wp.i18n.__("Tag", "beyond-fse"), value: "tag" },
                    ]}
                    onChange={(value) => setAttributes({ iconName: value })}
                    help={wp.i18n.__("Select the icon to display", "beyond-fse")}
                  />
                </>
              )}
            </wp.components.PanelBody>
          </wp.blockEditor.InspectorControls>
        </>
      );
    };
  }, "withIconControl")
);

// Filter to add the icon classes to the block wrapper in the editor.
wp.hooks.addFilter(
  "editor.BlockListBlock",
  "beyond-fse/button-extension-editor-class",
  wp.compose.createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
      const { name, attributes } = props;

      if (name !== "core/button") {
        return <BlockListBlock {...props} />;
      }

      const { displayIcon, leftIcon, iconName } = attributes;
      let newClassName = props.className;

      if (displayIcon) {
        let classes = [];
        
        // Always add 'has-icon' when displayIcon is true
        classes.push('has-icon');
        
        // Add 'icon-left' if leftIcon is true
        if (leftIcon) {
          classes.push('icon-left');
        }
        
        // Add 'has-icon-${iconName}' if iconName is not empty
        if (iconName && iconName.trim() !== '') {
          classes.push(`has-icon-${iconName}`);
        }
        
        if (classes.length > 0) {
          newClassName = newClassName 
            ? `${newClassName} ${classes.join(' ')}`
            : classes.join(' ');
        }
      }

      return <BlockListBlock {...props} className={newClassName} />;
    };
  }, "withIconEditorClass")
);
