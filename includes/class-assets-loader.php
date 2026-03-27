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
		\add_filter( 'style_loader_tag', array( __CLASS__, 'assets_preload' ), 10, 2 );
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
			file_exists( BEYOND_FSE_ASSETS_DIR . '/front.css' ) ? filemtime( BEYOND_FSE_ASSETS_DIR . '/front.css' ) : BEYOND_FSE_VERSION,
		);

		// Enqueue theme's main script.
		\wp_enqueue_script(
			'beyond-fse-front-script',
			BEYOND_FSE_ASSETS_ROOT . '/front.js',
			array(),
			file_exists( BEYOND_FSE_ASSETS_DIR . '/front.js' ) ? filemtime( BEYOND_FSE_ASSETS_DIR . '/front.js' ) : BEYOND_FSE_VERSION,
			array(
				'strategy'  => 'defer',
				'in_footer' => true,
			)
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
			file_exists( BEYOND_FSE_ASSETS_DIR . '/admin.css' ) ? filemtime( BEYOND_FSE_ASSETS_DIR . '/admin.css' ) : BEYOND_FSE_VERSION,
		);

		// Enqueue theme's main script.
		\wp_enqueue_script(
			'beyond-fse-admin-script',
			BEYOND_FSE_ASSETS_ROOT . '/admin.js',
			array(),
			file_exists( BEYOND_FSE_ASSETS_DIR . '/admin.js' ) ? filemtime( BEYOND_FSE_ASSETS_DIR . '/admin.js' ) : BEYOND_FSE_VERSION,
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
	 * Filters the HTML link tags for specific stylesheets to implement preloading.
	 *
	 * This method adds a 'rel="preload"' link for critical assets, ensuring they
	 * are fetched with high priority by the browser to reduce Cumulative Layout Shift (CLS).
	 *
	 * @since 0.1.0
	 * @hooked style_loader_tag
	 *
	 * @param string $html   The full HTML link tag for the enqueued style.
	 * @param string $handle The style's registered handle.
	 * @return string The modified HTML containing both the preload and the stylesheet tag.
	 */
	public static function assets_preload( $html, $handle ) {
		// Define an array of stylesheet handles that should be preloaded.
		$preload_handles = array(
			'beyond-fse-front-style',
		// Add other critical layout handles here.
		);

		if ( in_array( $handle, $preload_handles, true ) ) {
			/**
			 * Create the preload tag.
			 * We duplicate the link but change the relation to 'preload'.
			 */
			$preload_tag = preg_replace(
				'/rel=[\'"]stylesheet[\'"]/',
				'rel="preload" as="style"',
				$html
			);

			// Return the preload tag followed by the original stylesheet tag.
			return $preload_tag . $html;
		}

		return $html;
	}
}

// Ensure the class is loaded and running by calling its static init method.
Assets_Loader::init();
