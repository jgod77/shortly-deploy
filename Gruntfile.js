module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options:{
        separator: ';'
      },
      dist:{
        src: ['public/client/*.js', 'public/lib/*.js'],
        dest: 'public/dist/production.js'
      }
    },

    uglify: {
      my_target:{
        files: {
          'public/dist/uglify.min.js' : ['public/dist/production.js']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'public/dist/minCss.css' : ['public/style.css']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    eslint: {
      src: [
        'server.js',
        'server-config.js',
        'app/**/*.js',
        'client/**/*.js'
      ]
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
//hello
  // grunt.registerTask('concat',[
  //   'concat'
  // ]);

  // grunt.registerTask('uglify',[
  //   'uglify'
  // ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    if(//eslint passes){
      grunt.task.run([
        'build'
      ]);
    }
  });

    // add your deploy tasks he

    //run mochaTest
    //uglyifiy
    //concat
    //push to live master




};
