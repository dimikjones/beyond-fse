<?php
/**
 * Title: Page Now
 * Slug: beyond-fse/page-now
 * Description: Personal websites often have a link that says “now” that tells you what this person is focused on at this point in their life. It’s called a “now page”.
 * Categories: beyond-fse/pages
 * Keywords: now, nownownow, about, doing now, now page
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
<!-- wp:image {"aspectRatio":"16/9","scale":"cover","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="<?php echo esc_url( \get_template_directory_uri() ); ?>/assets/images/work-harder-neon.webp" alt="" class="wp-image-748" style="aspect-ratio:16/9;object-fit:cover"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading"><?php esc_html_e( 'What I am doing now?', 'beyond-fse' ); ?></h1>
<!-- /wp:heading -->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|tiny"}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph -->
<p><strong><?php esc_html_e( 'Last updated:', 'beyond-fse' ); ?></strong></p>
<!-- /wp:paragraph -->

<!-- wp:post-date {"metadata":{"bindings":{"datetime":{"source":"core/post-data","args":{"field":"modified"}}}},"className":"wp-block-post-date__modified-date"} /--></div>
<!-- /wp:group -->

<!-- wp:paragraph -->
<p>
<?php
	printf(
		/* translators: %1$s: <strong> tag, %2$s: </strong> tag */
		esc_html__( 'This is my %1$sNow page%2$s. It’s a place where you can find out what I’m currently focused on throughout the year. My goal is to update it several times annually. While I have seen similar pages on some blogs, I was originally inspired to create mine by fellow developers in the community.', 'beyond-fse' ),
		'<strong>',
		'</strong>'
	);
	?>
</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Professional Reading', 'beyond-fse' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'I\'m the kind of person who learns by doing, catching up on the theory along the way. While this hands-on approach works great for me, I want to allocate more time to reading industry books and staying updated with the latest engineering trends and best practices.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Blogging & Sharing Knowledge', 'beyond-fse' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Since I\'ve finally revamped and launched this new blog, I am excited to start writing again. I plan to blog about web development, share my thoughts on various technical topics, and document my journey. My goal is to share knowledge; I’m a firm believer that the best way to learn more is to teach others.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Industry Insights', 'beyond-fse' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'After years of shifts in the tech landscape, the rise of AI, and evolving industry standards, many wonder what the future holds for developers. While the industry faces new questions every year, the passion for writing clean code, solving complex problems, and creating great user experiences remains as strong as ever.', 'beyond-fse' ); ?></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->
