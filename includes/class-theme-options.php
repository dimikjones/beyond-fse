<?php
/**
 * Manages theme options via the WordPress Customizer.
 *
 * Adds a "Theme Options" panel with customizable settings for the theme.
 *
 * @since 1.0.0
 *
 * @package Beyond_FSE
 */

declare( strict_types=1 );

namespace Beyond_FSE;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Static class responsible for theme options and customizer settings.
 */
class Theme_Options {

	/**
	 * Initializes all necessary WordPress hooks for theme options.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function init() {
		// Hook to register customizer settings.
		\add_action( 'customize_register', array( __CLASS__, 'register_customizer' ) );

		// Hook to add body classes based on theme options.
		\add_filter( 'body_class', array( __CLASS__, 'add_body_classes' ) );
	}

	/**
	 * Registers customizer settings, sections, and controls.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_Customize_Manager $wp_customize Customizer manager instance.
	 * @return void
	 */
	public static function register_customizer( $wp_customize ) {
		// Add Theme Options panel.
		$wp_customize->add_panel(
			'beyond_fse_theme_options',
			array(
				'title'    => __( 'Theme Options', 'beyond-fse' ),
				'priority' => 160,
			)
		);

		// Add Header section.
		$wp_customize->add_section(
			'beyond_fse_header',
			array(
				'title' => __( 'Header', 'beyond-fse' ),
				'panel' => 'beyond_fse_theme_options',
			)
		);

		// Add Block Navigation Behavior setting.
		$wp_customize->add_setting(
			'beyond_fse_block_nav_behavior',
			array(
				'default'           => false,
				'type'              => 'theme_mod',
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => 'wp_validate_boolean',
			)
		);

		// Add Block Navigation Behavior control.
		$wp_customize->add_control(
			'beyond_fse_block_nav_behavior',
			array(
				'type'        => 'checkbox',
				'label'       => __( 'Block Navigation Behavior', 'beyond-fse' ),
				'description' => __( 'On desktop devices (> 1024px): Removes the open-on-click class from navigation items, restoring the expected hover behavior for desktop users.', 'beyond-fse' ),
				'section'     => 'beyond_fse_header',
			)
		);
	}

	/**
	 * Adds custom body classes based on theme options.
	 *
	 * @since 1.0.0
	 *
	 * @param array $classes Array of body classes.
	 * @return array Modified array of body classes.
	 */
	public static function add_body_classes( $classes ) {
		// Check if block navigation behavior is enabled.
		if ( \get_theme_mod( 'beyond_fse_block_nav_behavior', false ) ) {
			$classes[] = 'has-beyond-fse-block-nav-behavior';
		}

		return $classes;
	}
}

// Ensure the class is loaded and running by calling its static init method.
Theme_Options::init();
