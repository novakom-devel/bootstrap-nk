module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    clean: {
      distCss: 'dist/css',
      distFonts: 'dist/css',
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/Nk-bootstrap.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: 'vendor/Font-Awesome/fonts/*',
        dest: 'dist/fonts/'
      }
	}
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  //
  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:distCss', 'clean:distFonts', 'dist-css', 'copy:fonts']);
  grunt.registerTask('dist-css', ['less-compile', 'cssmin:minifyCore']);


  // Default task(s).
  grunt.registerTask('default', ['dist']);

};
