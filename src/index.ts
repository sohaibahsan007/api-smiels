import {ApplicationConfig, UserManagementApp} from './application';
import {environment} from './environments';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new UserManagementApp(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = environment;
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
