module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    pkg : {
      name: 'Stacked'
    },

    /**
     *  ___                    ___         _        _ _ 
     * | _ ) _____ __ _____ _ |_ _|_ _  __| |_ __ _| | |
     * | _ \/ _ \ V  V / -_) '_| || ' \(_-<  _/ _` | | |
     * |___/\___/\_/\_/\___|_||___|_||_/__/\__\__,_|_|_|
     *                                                  
     */
    bowerInstall: {
      target: {
        src: [ 'app/*.html' ]
      }
    },

    wiredep: {
      target: {
        src: [
          'app/*.html'
        ],
        // Optional:
        // ---------
        cwd: '',
        dependencies: true,
        devDependencies: false
      }
    },

    /**
     *  _   _      _ _  __      
     * | | | |__ _| (_)/ _|_  _ 
     * | |_| / _` | | |  _| || |
     *  \___/\__, |_|_|_|  \_, |
     *       |___/         |__/ 
     *
     */
    uglify: {
      any: {
        src: 'dist/*.js',
        dest: 'dist/xxx.js'
      }
    },

    /**
     *   ___                      _   
     *  / __|___ _ _  _ _  ___ __| |_ 
     * | (__/ _ \ ' \| ' \/ -_) _|  _|
     *  \___\___/_||_|_||_\___\__|\__|                                
     *
     */

    connect: {
      options: {
        port: 9000,
        livereload: true,
        hostname: 'localhost',
        /**
         *  middleware to serve up static HTML to standalone app
         *  @param  {[type]} connect     [description]
         *  @param  {[type]} options     [description]
         *  @param  {[type]} middlewares [description]
         *  @return {[type]}             [description]
         */
        // middleware: function (connect, options, middlewares) {
        //   var server = require('./mock/server.js');
        //   middlewares.push(server);
        //   return middlewares;
        // }
      },
      livereload: {
        options: {
            open: true,
            base: [ 'app' ]
        }
      }
    },
    
    /**
     *  _  _     _____               _      _          
     * | \| |__ |_   _|__ _ __  _ __| |__ _| |_ ___ ___
     * | .` / _` || |/ -_) '  \| '_ \ / _` |  _/ -_|_-<
     * |_|\_\__, ||_|\___|_|_|_| .__/_\__,_|\__\___/__/
     *      |___/              |_|                     
     *      
     */
    
    // ngtemplates: {
    //   options: {
    //     module: 'Stacked'
    //   },
    //   debug: {
    //     options: {
    //       htmlmin: {
    //         collapseBooleanAttributes     : false,
    //         collapseWhitespace            : false,
    //         removeAttributeQuotes         : false,
    //         removeComments                : false,
    //         removeEmptyAttributes         : false,
    //         removeRedundantAttributes     : false,
    //         removeScriptTypeAttributes    : false,
    //         removeStyleLinkTypeAttributes : false
    //       }
    //     },
    //     cwd: 'feature',
    //     src: 'views/**/*.html',
    //     dest: 'feature/views/templates.js'
    //   }
    // },

    /**
     *   ___                  _   
     *  / __|___ _ _  __ __ _| |_ 
     * | (__/ _ \ ' \/ _/ _` |  _|
     *  \___\___/_||_\__\__,_|\__|
     *                            
     */

    concat: {
      options: {
        separator: ';',
      },
      App: {
        src: [ 'feature/App.js' ],
        dest: 'dist/App.js'
      },
      GlslApp: {
        src: [ 'feature/GlslApp.js' ],
        dest: 'dist/GlslApp.js'
      },
      Full: {
        src: [ 'feature/App.js', 'feature/GlslApp.js' ],
        dest: 'dist/Full.js'
      }
    },

    /**
     *     _    _  _ _     _   
     *  _ | |__| || (_)_ _| |_ 
     * | || (_-< __ | | ' \  _|
     *  \__//__/_||_|_|_||_\__|
     *                         
     */

    jshint: {
      all: [
        "feature/**/*.js"
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * __      __    _      _    
     * \ \    / /_ _| |_ __| |_  
     *  \ \/\/ / _` |  _/ _| ' \ 
     *   \_/\_/\__,_|\__\__|_||_|
     *                           
     */

    watch: {
      scripts: {
        files: [ 'Gruntfile.js', 'test/**/*.js', 'feature/**/*.{css,js,html}' ],
        tasks: [ 'jshint', 'build', 'karma' ]
      }
    },

    /**
     *  _  __                    
     * | |/ /__ _ _ _ _ __  __ _ 
     * | ' </ _` | '_| '  \/ _` |
     * |_|\_\__,_|_| |_|_|_\__,_|
     *                         
     */

    karma: {
      unit: {
        options: {
            basePath: '',
            files: [ 'app/thirdparty/angular/angular.js', 'app/thirdparty/angular-mocks/angular-mocks.js', 'dist/Stacked.js', 'test/spec/**/*.js' ],
            port: 3000,
            runnerPort: 9999,
            frameworks: [ 'jasmine' ],
            singleRun: true,
            browsers: [ 'PhantomJS' ]
        }
      }
    }
  }

  );

  // Load Grunt Tasks
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Custom
  grunt.registerTask('dev', [ 'connect', 'watch' ]);
  grunt.registerTask('test', [ 'jshint', 'karma' ]);
  grunt.registerTask('build', [ 'ngtemplates', 'concat', 'uglify', 'wiredep' ]);
  grunt.registerTask('default', [ 'test' ]);
};
