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
  "melapress-website-theme/button-extension-attributes",
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
  "melapress-website-theme/button-extension-controls",
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
              title={wp.i18n.__("Icon Settings", "melapress-website-theme")}
              initialOpen={false} // Changed to false to keep it tidy
            >
              <wp.components.ToggleControl
                label={wp.i18n.__("Display Icon", "melapress-website-theme")}
                checked={displayIcon}
                onChange={(value) => setAttributes({ displayIcon: value })}
              />
              
              {displayIcon && (
                <>
                  <wp.components.ToggleControl
                    label={wp.i18n.__("Left Icon", "melapress-website-theme")}
                    checked={leftIcon}
                    onChange={(value) => setAttributes({ leftIcon: value })}
                    help={wp.i18n.__("Display icon on the left side", "melapress-website-theme")}
                  />
                  
                  <wp.components.SelectControl
                    label={wp.i18n.__("Icon Type", "melapress-website-theme")}
                    value={iconName}
                    options={[
                      { label: wp.i18n.__("None", "melapress-website-theme"), value: "" },
                      { label: wp.i18n.__("Arrow", "melapress-website-theme"), value: "arrow" },
                      { label: wp.i18n.__("Plus", "melapress-website-theme"), value: "plus" },
                      { label: wp.i18n.__("Link", "melapress-website-theme"), value: "link" },
                      { label: wp.i18n.__("Tag", "melapress-website-theme"), value: "tag" },
                    ]}
                    onChange={(value) => setAttributes({ iconName: value })}
                    help={wp.i18n.__("Select the icon to display", "melapress-website-theme")}
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
  "melapress-website-theme/button-extension-editor-class",
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

/**
 * Extends the core/navigation-link block to add image settings.
 * We wrap it in wp.domReady to ensure the block API is loaded.
 */
wp.domReady(() => {
  // Ensure all required WordPress objects are available
  if (
    !wp.blocks ||
    !wp.hooks ||
    !wp.compose ||
    !wp.blockEditor ||
    !wp.components ||
    !wp.i18n ||
    !wp.element
  ) {
    console.error(
      "WordPress components missing for navigation-link extension."
    );
    return;
  }

  const { addFilter } = wp.hooks;
  const { createHigherOrderComponent } = wp.compose;
  const { __ } = wp.i18n;

  /**
   * Add new attributes (menuImageId and menuImageUrl) to the core/navigation-link block.
   */
  addFilter(
    "blocks.registerBlockType",
    "melapress-website-theme/nav-link-image-attributes",
    (settings, name) => {
      // Target only the navigation-link block
      if (name !== "core/navigation-link") {
        return settings;
      }

      // Add new attributes
      if (!settings.attributes) {
        settings.attributes = {};
      }
      settings.attributes.menuImageId = {
        type: "number",
      };
      settings.attributes.menuImageUrl = {
        type: "string",
      };

      // NOT modifying settings.save here.
      return settings;
    }
  );

  /**
   * Add a MediaUpload control to the block's InspectorControls.
   */
  addFilter(
    "editor.BlockEdit",
    "melapress-website-theme/nav-link-image-control",
    createHigherOrderComponent((BlockEdit) => {
      return (props) => {
        // Target only the navigation-link block
        if (props.name !== "core/navigation-link") {
          // Render the original block edit component
          return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { menuImageId, menuImageUrl } = attributes;

        const onSelectImage = (media) => {
          setAttributes({
            menuImageId: media.id,
            menuImageUrl: media.url,
          });
        };

        const onRemoveImage = () => {
          setAttributes({
            menuImageId: undefined,
            menuImageUrl: undefined,
          });
        };

        return (
          <>
            {/* Render the original block edit component */}
            <BlockEdit {...props} />

            <wp.blockEditor.InspectorControls>
              <wp.components.PanelBody
                title={__("Menu Item Image", "melapress-website-theme")}
              >
                <p>
                  {__(
                    "Image to display next to menu item (doesn't have editor preview to prevent validation errors).",
                    "melapress-website-theme"
                  )}
                </p>
                {!menuImageId ? (
                  <wp.blockEditor.MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={["image"]}
                    value={menuImageId}
                    render={({ open }) => (
                      <wp.components.Button isPrimary onClick={open}>
                        {__("Select Image", "melapress-website-theme")}
                      </wp.components.Button>
                    )}
                  />
                ) : (
                  <>
                    <wp.components.ResponsiveWrapper
                      naturalWidth={100}
                      naturalHeight={100}
                      style={{ marginBottom: "8px" }}
                    >
                      <img
                        src={menuImageUrl}
                        alt=""
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </wp.components.ResponsiveWrapper>
                    <wp.components.Button
                      isLink
                      isDestructive
                      onClick={onRemoveImage}
                    >
                      {__("Remove Image", "melapress-website-theme")}
                    </wp.components.Button>
                  </>
                )}
              </wp.components.PanelBody>
            </wp.blockEditor.InspectorControls>
          </>
        );
      };
    }, "withMenuImageControl")
  );
});
