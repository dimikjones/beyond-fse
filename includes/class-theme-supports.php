<?php
/**
 * Theme Supports
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
 * Static class responsible for adding all theme supports.
 */
class Theme_Supports {

	/**
	 * Initializes all necessary WordPress hooks.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function init() {
		// Fix for "Links do not have descriptive text".
		\add_filter( 'render_block', array( __CLASS__, 'add_accessible_read_more' ), 10, 2 );

		// Add this line to trigger the font preload.
		add_action( 'wp_head', array( __CLASS__, 'preload_fonts' ), 1 );
	}

	/**
	 * Preload the Inter variable font to prevent layout shifts.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public static function preload_fonts() {
		?>
		<link rel="preload" href="<?php echo esc_url( get_theme_file_uri( 'assets/fonts/inter/Inter-VariableFont_opsz,wght.ttf' ) ); ?>" as="font" type="font/woff2" crossorigin>
		<?php
	}

	/**
	 * Injects screen-reader-only text into the Post Excerpt "Read More" link.
	 *
	 * @since 0.1.0
	 *
	 * @param string $block_content The block content.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string
	 */
	public static function add_accessible_read_more( $block_content, $block ) {
		if ( 'core/post-excerpt' === $block['blockName'] ) {
			$post_id = $block['attrs']['postId'] ?? get_the_ID();
			$title   = get_the_title( $post_id );

			// We append the title inside a span with our utility class.
			$sr_text = ' <span class="screen-reader-text">about ' . esc_html( $title ) . '</span></a>';

			// Inject the span before the closing anchor tag.
			$block_content = str_replace( '</a>', $sr_text, $block_content );
		}
		return $block_content;
	}
}

// Ensure the class is loaded and running by calling its static init method.
Theme_Supports::init();
