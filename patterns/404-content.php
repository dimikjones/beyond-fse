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
<figure class="wp-block-image size-full"><img src="<?php echo \esc_url( \get_template_directory_uri() ); ?>/assets/images/404-page-not-found.webp" alt="404 Page not found" style="aspect-ratio:16/9;object-fit:contain"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"textAlign":"center","level":1,"fontFamily":"code"} -->
<h1 class="wp-block-heading has-text-align-center has-code-font-family">404: Branch Not Found</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">It looks like this page has been force-pushed into oblivion or never existed in this repository. Try checking out <strong><code><a href="/">main</a></code> </strong>or switching to a different path.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"15vh"} -->
<div style="height:15vh" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer --></div>
<!-- /wp:group -->