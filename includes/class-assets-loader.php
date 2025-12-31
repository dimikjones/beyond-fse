<?php
/**
 * Enqueue assets
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
 * Static class responsible for enqueuing all theme scripts and styles for
 * both the front end and the block editor.
 */
class Assets_Loader {

	/**
	 * Initializes all necessary WordPress hooks.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function init() {
		// Include theme's front style and script.
		\add_action( 'wp_enqueue_scripts', array( __CLASS__, 'include_front_assets' ) );

		// Include theme's admin style and script (for block editor).
		\add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'include_admin_assets' ) );

		// Add front-end styles to the editor iframe content.
		\add_action( 'after_setup_theme', array( __CLASS__, 'add_theme_editor_styles' ) );

		// Increase maximum size for CSS files to be inlined by WordPress.
		\add_filter( 'styles_inline_size_limit', array( __CLASS__, 'inline_style_limit' ) );

		// Defer loading of specified styles.
		\add_filter( 'style_loader_tag', array( __CLASS__, 'defer_loading_of_front_css' ), 10, 2 );
	}

	/**
	 * Register theme front assets
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function include_front_assets() {
		// Enqueue theme's main style.
		\wp_enqueue_style(
			'beyond-fse-front-style',
			BEYOND_FSE_ASSETS_ROOT . '/front.css',
			array(),
			BEYOND_FSE_VERSION
		);

		// Enqueue theme's main script.
		\wp_enqueue_script(
			'beyond-fse-front-script',
			BEYOND_FSE_ASSETS_ROOT . '/front.js',
			array(),
			BEYOND_FSE_VERSION,
			true // Load in the footer.
		);
	}

	/**
	 * Register theme admin assets (for Block Editor)
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function include_admin_assets() {
		// Enqueue theme's main style.
		\wp_enqueue_style(
			'beyond-fse-admin-style',
			BEYOND_FSE_ASSETS_ROOT . '/admin.css',
			array(),
			BEYOND_FSE_VERSION
		);

		// Enqueue theme's main script.
		\wp_enqueue_script(
			'beyond-fse-admin-script',
			BEYOND_FSE_ASSETS_ROOT . '/admin.js',
			array(),
			BEYOND_FSE_VERSION,
			true // Load in the footer.
		);
	}

	/**
	 * Load front-end styles for the Block Editor iframe content using the canonical method.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function add_theme_editor_styles() {
		// Loads the frontend theme styles into the block editor to match the styling on the front end.
		\add_editor_style( 'assets/front.css' );
	}

	/**
	 * Sets the maximum size for CSS files to be inlined by WordPress.
	 *
	 * @since 0.1.0
	 *
	 * @return int The new limit in bytes.
	 */
	public static function inline_style_limit() {
		// Core WordPress default uses 40000 for a cleaner number.

		// Setting it to 60 KB (61440 bytes).
		$new_limit = 61440;

		return $new_limit;
	}

	/**
	 * Filters the HTML link tags for specific stylesheets to implement deferred loading
	 * via the 'rel="preload"' attribute and JavaScript onload fallback.
	 *
	 * This method prevents the CSS from being render-blocking initially, improving
	 * page load performance, especially for non-critical styles
	 *
	 * @since 0.1.0
	 *
	 * @hooked style_loader_tag
	 *
	 * @param string $html   The full HTML link tag for the enqueued style.
	 * @param string $handle The style's registered handle.
	 * @return string The modified HTML link tag for deferred loading, or the original tag.
	 */
	public static function defer_loading_of_front_css( $html, $handle ) {
		// Define an array of stylesheet handles for offload.
		$offload_handles = array(
			'beyond-fse-front-style',
		// Add any other handles here.
		);

		// Check if the current stylesheet's handle is in our list.
		if ( in_array( $handle, $offload_handles, true ) ) {
			// Replace 'rel="stylesheet"' with the preload pattern.
			// The onload attribute uses JS to switch rel='preload' back to rel='stylesheet' after the page loads.
			// Note: Using &apos; for single quotes inside the attribute value for robust HTML output.
			$preload_html = str_replace(
				"rel='stylesheet'",
				"rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"",
				$html
			);

			// Include a noscript fallback for browsers without JavaScript enabled.
			$noscript_fallback = "<noscript>{$html}</noscript>";

			return $preload_html . $noscript_fallback;
		}

		// If the handle is not in our list, return the original HTML.
		return $html;
	}
}

// Ensure the class is loaded and running by calling its static init method.
Assets_Loader::init();
