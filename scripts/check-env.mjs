#!/usr/bin/env node
const required = process.argv.slice(2);
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`All ${required.length} required environment variables are present.`);
