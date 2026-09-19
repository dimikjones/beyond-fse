<?php
/**
 * Title: Page About
 * Slug: beyond-fse/page-about
 * Description: About me page commonly present on blogs.
 * Categories: beyond-fse/pages
 * Keywords: about, about me, biography
 * Viewport Width: 800
 * Block Types:
 * Post Types:
 * Inserter: true
 *
 * @package Beyond_FSE
 */

?>
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:image {"sizeSlug":"large","linkDestination":"none","align":"center","isDecorative":true} -->
<figure class="wp-block-image aligncenter size-large"><img src="<?php echo esc_url( \get_template_directory_uri() ); ?>/assets/images/man-smiling.webp" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":1,"style":{"typography":{"textAlign":"center"}}} -->
<h1 class="wp-block-heading has-text-align-center"><?php esc_html_e( 'About me', 'beyond-fse' ); ?></h1>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Hi there! I am a software engineer, open-source enthusiast, and digital craftsman who has spent the last decade building accessible experiences on the web.', 'beyond-fse' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'The journey into web development didn\'t start with code, but with a passion for digital storytelling and typography. Years ago, while trying to launch a small online magazine, a discovery of WordPress changed everything. What was meant to be a weekend project quickly turned into an obsession. It was fascinating to see how a few lines of styling could completely alter the mood of a page, and how dynamic code could bring content to life.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Driven by curiosity, the path led from a casual user into a self-taught developer. Over the years, this career has spanned every corner of the digital ecosystem, from agency life engineering bespoke enterprise solutions to collaborating with global product teams. Having witnessed the web evolve from rigid layouts to fluid, responsive designs, the focus today is fully immersed in the frontier of Full Site Editing, block governance, and performance-first architecture.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'WordPress is more than just a content management system; it\'s an ecosystem built on the radical idea of democratizing publishing. That philosophy dictates the entire approach to building. The focus is always on clean code, semantic markup, and creating intuitive user interfaces that empower creators rather than confusing them.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'When code editors are closed and the screen is dark, inspiration comes from simple things like brewing the perfect cup of coffee, collecting vintage vinyl records, or hitting the mountain trails for a long hike. Spending a weekend disconnected in nature often turns out to be the absolute best way to debug a complex architectural problem.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Whether it is collaborating on an open-source project, discussing web performance, or exploring the future of modern block themes, the door is always open for a great conversation. Let\'s create something meaningful together!', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->