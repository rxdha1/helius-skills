#!/usr/bin/env node
const expected = process.env.WEBHOOK_AUTH_SECRET;
const supplied = process.argv[2];
if (!expected) {
  console.error("Missing WEBHOOK_AUTH_SECRET");
  process.exit(1);
}
if (!supplied) {
  console.error("Usage: node scripts/webhook-signature-test.mjs <authorization-header>");
  process.exit(2);
}
if (supplied !== expected) {
  console.error("Webhook authorization mismatch");
  process.exit(1);
}
console.log("Webhook authorization matches.");
