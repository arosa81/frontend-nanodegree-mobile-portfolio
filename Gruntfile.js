/*
Options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
  "grunt uglify" minify's javascript files
  "grunt cssmin" minify's css files
  "grunt minifyHtml" minify's HTML files
*/

module.exports = function(grunt) {
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'small',
            width: '30%',
            suffix: '_small',
            quality: 60
          },{
            name: 'large',
            width: '50%',
            suffix: '_large',
            quality: 90
          }]
        },
        files: [{
          expand: true,
          src: ['pizzeria.{gif,jpg,png}'],
          cwd: 'views/images/',
          dest: 'views/images_compressed/'
        }]
      }
    },
    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['view/images_compressed'],
      },
    },
    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['view/images_compressed']
        },
      },
    },
    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'view/images/fixed/*.{gif,jpg,png}',
          dest: 'view/images_compressed/'
        }]
      },
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dynamic_mapping: {
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'views/js/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'views/js/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        },
      ],
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'views/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'views/css/',
          ext: '.min.css'
        }]
      }
    },
    minifyHtml: {
        options: {
            cdata: true
        },
        dist: {
            files: {
                '*/*.html': '*/*.min.html'
            }
        }
    },
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', ['uglify'], 'cssmin', 'minifyHtml']);
};
