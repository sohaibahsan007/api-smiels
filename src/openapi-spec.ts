import {ApplicationConfig} from '@loopback/core';
import {UserManagementApp} from './application';
import {environment} from './environments';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = environment.rest;
  const outFile = process.argv[2] ?? '';
  const app = new UserManagementApp(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
