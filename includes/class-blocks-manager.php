<?php
/**
 * Manages all block-related configurations, including registering custom
 * block styles and extending default block attributes.
 *
 * @since 0.1.0
 *
 * @package Beyond_FSE
 */

declare( strict_types=1 );

namespace Beyond_FSE;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Static class responsible for configuring core and custom blocks.
 */
class Blocks_Manager {

	/**
	 * Initializes all necessary WordPress hooks for block management.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function init() {
		// Hook to register custom block styles, typically on 'init' or 'after_setup_theme'.
		\add_action( 'after_setup_theme', array( __CLASS__, 'register_styles' ) );

		// Hook to extend core/post-author-name block with custom tag.
		\add_filter( 'render_block', array( __CLASS__, 'render_author_name_with_tag' ), 10, 2 );
	}

	/**
	 * Renders the author name with custom HTML tag on the core/post-author-name block's front-end.
	 *
	 * This hook modifies the block output to use the selected tag (div, h1-h6) instead of default div.
	 *
	 * @param string $block_content The block's content.
	 * @param array  $block         The full block array, including name and attributes.
	 * @return string The modified block content.
	 *
	 * @since 0.1.0
	 */
	public static function render_author_name_with_tag( $block_content, $block ) {

		// Target only the core/post-author-name block.
		if ( 'core/post-author-name' === $block['blockName'] ) {

			// Get the tag saved from our JS attribute (fallback to div).
			$tag = isset( $block['attrs']['tagName'] ) ? $block['attrs']['tagName'] : 'div';

			// Ensure the tag is valid (div or h1-h6).
			$valid_tags = array( 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' );
			if ( ! in_array( $tag, $valid_tags, true ) ) {
				$tag = 'div';
			}

			// Use regex to replace the opening and closing div tags while preserving attributes.
			// This keeps all the existing classes and styles intact.
			$block_content = preg_replace( '/<div([^>]*)>/i', '<' . $tag . '$1>', $block_content );
			$block_content = preg_replace( '/<\/div>/i', '</' . $tag . '>', $block_content );
		}

		// Always return the block content.
		return $block_content;
	}

	/**
	 * Registers custom block styles.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function register_styles() {
		if ( ! function_exists( 'register_block_style' ) ) {
			return;
		}

		$block_styles = array(
			'core/list'         => array(
				'list-check-circle' => __( 'Check Circle', 'beyond-fse' ),
			),
			'core/code'         => array(
				'code-invert' => __( 'Invert', 'beyond-fse' ),
			),
			'core/separator'    => array(
				'separator-stripes'   => __( 'Stripes', 'beyond-fse' ),
				'separator-thin'      => __( 'Thin', 'beyond-fse' ),
				'separator-thin-wide' => __( 'Thin Wide', 'beyond-fse' ),
			),
			'core/preformatted' => array(
				'preformatted-invert' => __( 'Invert', 'beyond-fse' ),
			),
		);

		foreach ( $block_styles as $block => $styles ) {
			foreach ( $styles as $style_name => $style_label ) {
				\register_block_style(
					$block,
					array(
						'name'  => $style_name,
						'label' => $style_label,
					)
				);
			}
		}
	}
}

// Ensure the class is loaded and running by calling its static init method.
Blocks_Manager::init();
