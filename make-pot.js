#!/usr/bin/env node

/**
 * Generate .pot file for Beyond FSE Theme
 *
 * Scans all PHP, JS, and JSON files for translatable strings
 * and generates languages/beyond-fse.pot.
 *
 * Usage: npm run make-pot
 */

const { execSync } = require( 'child_process' );
const path = require( 'path' );
const fs = require( 'fs' );
const os = require( 'os' );

const THEME_DIR = __dirname;
const POT_FILE = path.join( THEME_DIR, 'languages', 'beyond-fse.pot' );

// Ensure languages directory exists
const langDir = path.dirname( POT_FILE );
if ( ! fs.existsSync( langDir ) ) {
	fs.mkdirSync( langDir, { recursive: true } );
}

// Resolve wp-cli path (user bin directory)
const homeDir = os.homedir();
const wpCliPath = path.join( homeDir, 'bin', 'wp.bat' );

const command = `"${ wpCliPath }" i18n make-pot "${ THEME_DIR }" "${ POT_FILE }" --allow-root`;

console.log( '🔤 Generating .pot file...' );

try {
	execSync( command, {
		cwd: THEME_DIR,
		stdio: 'inherit',
		shell: true,
	} );

	// Post-process the .pot file to set custom headers.
	// The --headers flag has quoting issues on Windows, so we do it here.
	let content = fs.readFileSync( POT_FILE, 'utf8' );

	content = content.replace(
		/Report-Msgid-Bugs-To: .+/,
		'Report-Msgid-Bugs-To: https://github.com/dimikjones/beyond-fse'
	);

	fs.writeFileSync( POT_FILE, content, 'utf8' );

	console.log( `✅ POT file generated: ${ POT_FILE }` );
} catch ( error ) {
	console.error( '❌ Failed to generate POT file:', error.message );
	process.exit( 1 );
}
