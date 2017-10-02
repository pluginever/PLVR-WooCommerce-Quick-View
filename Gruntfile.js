module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var bannerTemplate = '/**\n' +
        ' * <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %>;\n' +
        ' * Licensed GPLv2+\n' +
        ' */\n';

    var compactBannerTemplate = '/**\n' +
        ' * <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> | <%= pkg.homepage %> | Copyright (c) <%= grunt.template.today("yyyy") %>; | Licensed GPLv2+\n' +
        ' */\n';

    // Project configuration
    grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
        options: {
            stripBanners: true,
            banner: bannerTemplate
        },
            plvr_wc_quick_view: {
                src: [
                    'assets/js/vendor/*.js',
                    'assets/js/src/plvr-wc-quick-view.js',
                ],
                    dest: 'assets/js/plvr-wc-quick-view.js'
            }
        },
    // jshint
    jshint: {
        options: {
            jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
        },
        main: [
            'assets/js/src/*.js',
        ]
    },

    uglify: {
        all: {
            files: {
                'assets/js/plvr-wc-quick-view.min.js': ['assets/js/plvr-wc-quick-view.js']
            },
            options: {
                banner: compactBannerTemplate,
                mangle: false
            },
            compress: {
                drop_console: true
            }
        }
    },
        
        sass:   {
            all: {
                files: {
                    'assets/css/plvr-wc-quick-view.css': 'assets/css/sass/plvr-wc-quick-view.scss'
                }
            }
        },

        
        cssmin: {
            options: {
                banner: bannerTemplate
            },
            minify: {
                expand: true,
                
                cwd: 'assets/css/',
                src: ['plvr-wc-quick-view.css'],
                
                dest: 'assets/css/',
                ext: '.min.css'
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                        svgoPlugins: [{removeViewBox: false}],
                        use: [] // Example plugin usage
                },
                files: {
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/src/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'assets/images/'
                }]
            }
        },

        watch:  {
             options: {
                livereload: true,
            },
            
            sass: {
                files: ['assets/css/sass/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    debounceDelay: 500
                }
            },
            
            scripts: {
                files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    debounceDelay: 500
                }
            }
        },

        /**
         * check WP Coding standards
         * https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
         */
        phpcs: {
            application: {
                dir: [
                    '**/*.php',
                    '!**/node_modules/**'
                ]
            },
            options: {
                bin: '~/phpcs/scripts/phpcs',
                standard: 'WordPress'
            }
        },
           // Generate POT files.
        makepot: {
            target: {
                options: {
                    exclude: ['build/.*', 'node_modules/*', 'assets/*'],
                        domainPath: '/i18n/languages/', // Where to save the POT file.
                        potFilename: 'plvr-wc-quick-view.pot', // Name of the POT file.
                        type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
                        potHeaders: {
                        'report-msgid-bugs-to': 'http://pluginever.com/support/',
                            'language-team': 'LANGUAGE <support@pluginever.com>'
                    }
                }
            }
        },
            // Clean up build directory
        clean: {
            main: ['build/']
        },
          copy: {
        main: {
            src: [
                '**',
                '!node_modules/**',
                '!.codekit-cache/**',
                '!.idea/**',
                '!build/**',
                '!bin/**',
                '!.git/**',
                '!Gruntfile.js',
                '!package.json',
                '!composer.json',
                '!composer.lock',
                '!debug.log',
                '!phpunit.xml',
                '!.gitignore',
                '!.gitmodules',
                '!npm-debug.log',
                '!plugin-deploy.sh',
                '!export.sh',
                '!config.codekit',
                '!nbproject/*',
                '!tests/**',
                '!README.md',
                '!CONTRIBUTING.md',
                '!**/*~',
                '!.csscomb.json',
                '!.editorconfig',
                '!.jshintrc',
                '!.tmp',
                '!assets/src/**',
            ],
                dest: 'build/'
        }
    },
      compress: {
        main: {
            options: {
                mode: 'zip',
                    archive: './build/plvr-woocommerce-quick-view-' + pkg.version + '.zip'
            },
            expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: 'plvr-woocommerce-quick-view'
        }
    },
    server: {
        options: {
            message: 'Server is ready!'
        }
    }



});

// Load other tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-phpcs');
    
    // Default task.
    
    grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin', 'imagemin', 'notify:server'] );
    

    grunt.registerTask('release', ['makepot', 'zip']);
    grunt.registerTask('zip', ['clean', 'copy', 'compress']);
    grunt.util.linefeed = '\n';
};