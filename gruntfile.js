module.exports = function(grunt){
  grunt.initConfig({
    watch: {
      jade: {
        files: ['views/**'], //要监控的jade文件目录
        options: {
          livereload: true  //是否即时重载--重启服务
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true  //是否即时重载
        }
      },
      uglify: {
        files: ['public/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['public/**/*.less'],
        //tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

    nodemon: {
      dev: {  //开发环境下的配置
        script: 'app.js',
        options: {
          file: "app.js", //入口文件
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000 //端口
          },
          cwd: __dirname
        }
      }
    },
    /*nodemon: {
         dev: {
              script: 'app.js',
              options: {
                   args: [],
                   nodeArgs: ['--debug'],
                   ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                   ext: 'js',
                   watch: ['./'],
                   delay: 1000,
                   env: {
                        PORT: '3000'
                   },
                   cwd: __dirname
              }
         }
    },*/
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['public/libs/**/*.js']
      },
      all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/build/index.css': 'public/less/index.less'
        }
      }
    },

    uglify: {
      development: {
        files: {
          'public/build/admin.min.js': 'public/js/admin.js',
          'public/build/detail.min.js': [
            'public/js/detail.js'
          ]
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },

    concurrent: {
      tasks: ['nodemon', 'watch', 'uglify'],
      options: {
        logConcurrentOutput: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch'); //类似于项目监控器
  grunt.loadNpmTasks('grunt-nodemon');  //可以认为是对app.js的一层封装
  grunt.loadNpmTasks('grunt-concurrent'); //优化慢任务
  grunt.loadNpmTasks('grunt-mocha-test'); //优化慢任务
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify'); //优化慢任务

  grunt.option('force', true);  //设为强制执行，避免由于某些原因中断

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['less', 'uglify']);
  grunt.registerTask('default', ['concurrent']);
}