<?php
/**
 * Plugin Name: PLVR WooCommerce Quick View
 * Plugin URI:  http://pluginever.com
 * Description: The best WordPress plugin ever made!
 * Version:     1.0.0
 * Author:      PluginEver
 * Author URI:  http://pluginever.com
 * Donate link: http://pluginever.com
 * License:     GPLv2+
 * Text Domain: plvr-wc-quick-view
 * Domain Path: /languages
 */

/**
 * Copyright (c) 2017 PluginEver (email : support@pluginever.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;
/**
 * Main initiation class
 *
 * @since 1.0.0
 */
class PLVR_WC_Quick_View {

    /**
     * Add-on Version
     *
     * @since 1.0.0
     * @var  string
     */
	public $version = '1.0.0';

	/**
	 * Initializes the class
	 *
	 * Checks for an existing instance
	 * and if it does't find one, creates it.
	 *
	 * @since 1.0.0
	 *
	 * @return object Class instance
	 */
	public static function init() {
		static $instance = false;

		if ( ! $instance ) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	 * Constructor for the class
	 *
	 * Sets up all the appropriate hooks and actions
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function __construct() {
		// Localize our plugin
		add_action( 'init', [ $this, 'localization_setup' ] );

		// on activate plugin register hook
		register_activation_hook( __FILE__, array( $this, 'install' ) );

		// on deactivate plugin register hook
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

		// Define constants
		$this->define_constants();

		// Include required files
		$this->includes();

		// Initialize the action hooks
		$this->init_actions();

		// instantiate classes
		$this->instantiate();

		// Loaded action
		do_action( 'plvr_wc_quick_view' );
	}

	/**
	 * Initialize plugin for localization
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function localization_setup() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'plvr_wc_quick_view' );
		load_textdomain( 'plvr-wc-quick-view', WP_LANG_DIR . '/plvr-wc-quick-view/plvr-wc-quick-view-' . $locale . '.mo' );
		load_plugin_textdomain( 'plvr-wc-quick-view', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	/**
	 * Executes during plugin activation
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function install() {


	}

	/**
	 * Executes during plugin deactivation
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function deactivate() {

	}

	/**
	 * Define constants
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function define_constants() {
		define( 'PLVR_WCQV_VERSION', $this->version );
		define( 'PLVR_WCQV_FILE', __FILE__ );
		define( 'PLVR_WCQV_PATH', dirname( PLVR_WCQV_FILE ) );
		define( 'PLVR_WCQV_INCLUDES', PLVR_WCQV_PATH . '/includes' );
		define( 'PLVR_WCQV_URL', plugins_url( '', PLVR_WCQV_FILE ) );
		define( 'PLVR_WCQV_ASSETS', PLVR_WCQV_URL . '/assets' );
		define( 'PLVR_WCQV_VIEWS', PLVR_WCQV_PATH . '/views' );
		define( 'PLVR_WCQV_TEMPLATES_DIR', PLVR_WCQV_PATH . '/templates' );
	}

	/**
	 * Include required files
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function includes( ) {
		require PLVR_WCQV_INCLUDES .'/functions.php';
	}

	/**
	 * Init Hooks
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function init_actions() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_assets') );
	}

	/**
	 * Instantiate classes
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function instantiate() {

	}

	/**
	 * Add all the assets required by the plugin
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function load_assets(){
		$suffix = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? '' : '.min';
		wp_register_style('plvr-wc-quick-view', PLVR_WCQV_ASSETS.'/css/plvr-wc-quick-view{$suffix}.css', [], date('i'));
		wp_register_script('plvr-wc-quick-view', PLVR_WCQV_ASSETS.'/js/plvr-wc-quick-view{$suffix}.js', ['jquery'], date('i'), true);
		wp_localize_script('plvr-wc-quick-view', 'jsobject', ['ajaxurl' => admin_url( 'admin-ajax.php' )]);
		wp_enqueue_style('plvr-wc-quick-view');
		wp_enqueue_script('plvr-wc-quick-view');
	}


	/**
	 * Logger for the plugin
	 *
	 * @since	1.0.0
	 *
	 * @param  $message
	 *
	 * @return  string
	 */
	public static function log($message){
		if( WP_DEBUG !== true ) return;
		if (is_array($message) || is_object($message)) {
			$message = print_r($message, true);
		}
		$debug_file = WP_CONTENT_DIR . '/custom-debug.log';
		if (!file_exists($debug_file)) {
			@touch($debug_file);
		}
		return error_log(date("Y-m-d\tH:i:s") . "\t\t" . strip_tags($message) . "\n", 3, $debug_file);
	}

}

// init our class
$GLOBALS['PLVR_WC_Quick_View'] = new PLVR_WC_Quick_View();

/**
 * Grab the $PLVR_WC_Quick_View object and return it
 */
function plvr_wc_quick_view() {
	global $PLVR_WC_Quick_View;
	return $PLVR_WC_Quick_View;
}
