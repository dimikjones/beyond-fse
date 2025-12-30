<?php
/**
 * Beyond FSE functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Beyond_FSE
 *
 * @since 1.0.0
 */

declare( strict_types=1 );

namespace Beyond_FSE;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// CONSTANTS.
define( 'BEYOND_FSE_VERSION', \wp_get_theme()->get( 'Version' ) );
define( 'BEYOND_FSE_ROOT', \get_template_directory_uri() );
define( 'BEYOND_FSE_ROOT_DIR', \get_template_directory() );
define( 'BEYOND_FSE_ASSETS_ROOT', BEYOND_FSE_ROOT . '/assets' );

// Includes.
require_once BEYOND_FSE_ROOT_DIR . '/includes/class-assets-loader.php';
