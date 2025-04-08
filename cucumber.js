module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'step_definitions/**/*.js',
      'utils/**/*.js',
      'hooks.js',
      'group_hooks.js',
      'world.js'
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    parallel: 1
  }
};