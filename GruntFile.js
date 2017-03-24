module.exports = function (grunt) {

   'use strict';

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      nodeunit: {
         unit: ['test/unit/test*.js'],
         integration: ['test/integration/test*.js']
      },

      release: {
         options: {
            file: 'package.json',
            tagName: '<%= version %>', //default: '<%= version %>'
            commitMessage: 'Release <%= version %>', //default: 'release <%= version %>'
            tagMessage: 'Tag version <%= version %>' //default: 'Version <%= version %>'
         }
      },
      
      copy: {
        typings: {
            files: [
                { expand: true, cwd: './typings', src: ['./**'], dest: '.' }
            ]
        }  
      }
   });

   grunt.loadNpmTasks('grunt-contrib-nodeunit');
   grunt.loadNpmTasks('grunt-release-steps');
   grunt.loadNpmTasks('grunt-contrib-copy');

   grunt.registerTask('-to-npm', ['release:npm']);
   grunt.registerTask('-to-git', ['release:add:commit:push']);
   grunt.registerTask('-tag',    ['release:tag:pushTags']);

   'patch minor major'.split(' ').forEach(function (type) {
      grunt.registerTask(type, ['test', 'copy:typings', 'release:bump:' + type, '-tag', '-to-git', '-to-npm']);
   });

   grunt.registerTask('default', ['patch']);
   grunt.registerTask('test', ['nodeunit:unit', 'nodeunit:integration']);

};
