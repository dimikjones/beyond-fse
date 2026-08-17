<?php
/**
 * Title: 404 Content
 * Slug: beyond-fse/404-content
 * Description: 404 page not found content with image.
 * Categories: beyond-fse/pages
 * Keywords: 404, not found, error
 * Viewport Width: 800
 * Block Types:
 * Post Types:
 * Inserter: false
 *
 * @package Beyond_FSE
 */

?>
<!-- wp:group {"align":"wide","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-group alignwide"><!-- wp:image {"aspectRatio":"16/9","scale":"contain","sizeSlug":"full","linkDestination":"none"} -->
<figure class="wp-block-image size-full"><img src="<?php echo \esc_url( \get_template_directory_uri() ); ?>/assets/images/404-page-not-found.webp" alt="<?php esc_attr_e( '404 Page not found', 'beyond-fse' ); ?>" style="aspect-ratio:16/9;object-fit:contain"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","level":1,"fontFamily":"code"} -->
<h1 class="wp-block-heading has-text-align-center has-code-font-family"><?php esc_html_e( '404: Branch Not Found', 'beyond-fse' ); ?></h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">
<?php
	printf(
		/* translators: %s: Link to the homepage/main branch */
		esc_html__( 'It looks like this page has been force-pushed into oblivion or never existed in this repository. Try checking out %s or try your luck with search.', 'beyond-fse' ),
		'<strong><code><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'main', 'beyond-fse' ) . '</a></code></strong>'
	);
	?>
</p>
<!-- /wp:paragraph -->

<!-- wp:search {"label":"<?php echo esc_attr__( 'Search', 'beyond-fse' ); ?>","showLabel":false,"placeholder":"<?php echo esc_attr__( 'Type...', 'beyond-fse' ); ?>","width":100,"widthUnit":"%","buttonText":"<?php echo esc_attr__( 'Search', 'beyond-fse' ); ?>"} /-->

<!-- wp:spacer {"height":"10vh"} -->
<div style="height:10vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->
