/**
 * Author Name Heading Tag functionality
 * Adds tagName attribute to core/post-author-name block
 */
wp.hooks.addFilter(
  "blocks.registerBlockType",
  "beyond-fse/author-name-tag-attribute",
  (settings, name) => {
    if (name !== "core/post-author-name") {
      return settings;
    }

    // Add tagName attribute
    if (!settings.attributes) {
      settings.attributes = {};
    }
    settings.attributes.tagName = {
      type: "string",
      default: "div",
    };

    return settings;
  }
);

/**
 * Author Name Heading Tag UI Control
 * Adds tagName selector to core/post-author-name block settings
 */
wp.hooks.addFilter(
  "editor.BlockEdit",
  "beyond-fse/author-name-tag-control",
  wp.compose.createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      if (props.name !== "core/post-author-name") {
        return <BlockEdit {...props} />;
      }

      const { attributes, setAttributes } = props;
      const { tagName } = attributes;

      return (
        <>
          <BlockEdit {...props} />
          <wp.blockEditor.InspectorControls>
            <wp.components.PanelBody
              title={wp.i18n.__("Heading Tag", "beyond-fse")}
              initialOpen={false}
            >
              <wp.components.SelectControl
                label={wp.i18n.__("Tag Name", "beyond-fse")}
                value={tagName || "div"}
                options={[
                  { label: wp.i18n.__("Div", "beyond-fse"), value: "div" },
                  { label: wp.i18n.__("Heading 1", "beyond-fse"), value: "h1" },
                  { label: wp.i18n.__("Heading 2", "beyond-fse"), value: "h2" },
                  { label: wp.i18n.__("Heading 3", "beyond-fse"), value: "h3" },
                  { label: wp.i18n.__("Heading 4", "beyond-fse"), value: "h4" },
                  { label: wp.i18n.__("Heading 5", "beyond-fse"), value: "h5" },
                  { label: wp.i18n.__("Heading 6", "beyond-fse"), value: "h6" },
                ]}
                onChange={(value) => setAttributes({ tagName: value })}
                help={wp.i18n.__("Select the HTML tag for the author name", "beyond-fse")}
                __nextHasNoMarginBottom={ true }
						    __next40pxDefaultSize={ true }
              />
            </wp.components.PanelBody>
          </wp.blockEditor.InspectorControls>
        </>
      );
    };
  }, "withAuthorNameTagControl")
);