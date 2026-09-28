#!/usr/bin/env node
const method = process.argv[2];
const params = process.argv[3] ? JSON.parse(process.argv[3]) : [];
if (!method) {
  console.error("Usage: node scripts/helius-rpc.mjs <method> '[params-json]'");
  process.exit(2);
}
if (!process.env.HELIUS_API_KEY) {
  console.error("Missing HELIUS_API_KEY");
  process.exit(1);
}
const network = process.env.HELIUS_NETWORK || "mainnet";
const host = network === "devnet"
  ? "https://devnet.helius-rpc.com"
  : "https://mainnet.helius-rpc.com";
const response = await fetch(`${host}/?api-key=${encodeURIComponent(process.env.HELIUS_API_KEY)}`, {
  method: "POST",
  headers: {"content-type": "application/json"},
  body: JSON.stringify({jsonrpc:"2.0", id:1, method, params})
});
const text = await response.text();
if (!response.ok) {
  console.error(`HTTP ${response.status}: ${text}`);
  process.exit(1);
}
console.log(text);
