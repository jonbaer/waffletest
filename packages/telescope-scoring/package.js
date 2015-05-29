Package.describe({
  name: "telescope:scoring",
  summary: "Telescope scoring package.",
  version: "0.20.4",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use(['telescope:core@0.20.4']);

  api.addFiles([
    'lib/scoring.js',
  ], ['client','server']);

  api.addFiles([
    'lib/server/cron.js',
  ], ['server']);


});
