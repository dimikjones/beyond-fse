<?php
/**
 * Theme Supports
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
 * Static class responsible for adding all theme supports.
 */
class Theme_Supports {

	/**
	 * Initializes all necessary WordPress hooks.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function init() {
		// Fix for "Links do not have descriptive text".
		\add_filter( 'render_block', array( __CLASS__, 'add_accessible_read_more' ), 10, 2 );
	}

	/**
	 * Injects screen-reader-only text into the Post Excerpt "Read More" link.
	 *
	 * @since 1.0.0
	 *
	 * @param string $block_content - The block content.
	 * @param array  $block - The full block, including name and attributes.
	 *
	 * @return string $block_content - The filtered block content.
	 */
	public static function add_accessible_read_more( $block_content, $block ) {
		$block_name = $block['blockName'] ?? '';

		if ( 'core/post-excerpt' !== $block_name ) {
			return $block_content;
		}

		/**
		 * Bail out when the block renders no "Read more" link, otherwise the span would be
		 * appended to a link inside the excerpt body.
		 */
		if ( ! str_contains( $block_content, 'wp-block-post-excerpt__more-link' ) ) {
			return $block_content;
		}

		$post_id = $block['attrs']['postId'] ?? \get_the_ID();
		$title   = \get_the_title( $post_id );

		if ( '' === $title ) {
			return $block_content;
		}

		// Screen reader only text, appended inside the "Read more" link.
		$sr_text = '<span class="screen-reader-text">' . sprintf(
			/* translators: %s: Post or page title. Leading space separates it from the link text. */
			\esc_html__( ' about %s', 'beyond-fse' ),
			\esc_html( $title )
		) . '</span>';

		// Inject the span before the closing anchor tag.
		// We replace only the last </a> to avoid affecting other links inside the excerpt.
		$last_anchor = strrpos( $block_content, '</a>' );

		if ( false === $last_anchor ) {
			return $block_content;
		}

		return substr_replace( $block_content, $sr_text . '</a>', $last_anchor, 4 );
	}
}

// Ensure the class is loaded and running by calling its static init method.
Theme_Supports::init();
