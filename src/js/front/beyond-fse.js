(function() {
    'use strict';

    /**
     * Create a namespace for the object.
     */
    const beyondFseNavSubmenuBehavior = {
        
        /**
         * Initialize the navigation logic
         */
        init: function() {
            // Run on load
            this.adjustBehavior();
            
            // Run on resize with debouncing
            window.addEventListener('resize', this.debounce(() => {
                this.adjustBehavior();
            }, 250));
        },

        /**
         * Adjust navigation behavior based on screen size
         */
        adjustBehavior: function() {
            const isDesktop = window.innerWidth > 1024;
            const navItems = document.querySelectorAll('.wp-block-navigation .has-child');
            
            navItems.forEach(item => {
                if (isDesktop) {
                    item.classList.remove('open-on-click');
                } else {
                    item.classList.add('open-on-click');
                }
            });
        },

        /**
         * Utility: Debounce
         */
        debounce: function(func, wait) {
            let timeout;
            return function(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Fire it off when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Check if block navigation behavior is enabled via body class
        if ( ! document.body.classList.contains( 'has-beyond-fse-block-nav-behavior' ) ) {
            return;
        }
        beyondFseNavSubmenuBehavior.init();
    });
})();