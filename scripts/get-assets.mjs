#!/usr/bin/env node
const owner = process.argv[2];
if (!owner) {
  console.error("Usage: node scripts/get-assets.mjs <owner>");
  process.exit(2);
}
const apiKey = process.env.HELIUS_API_KEY;
if (!apiKey) {
  console.error("Missing HELIUS_API_KEY");
  process.exit(1);
}
const network = process.env.HELIUS_NETWORK || "mainnet";
const host = network === "devnet" ? "devnet" : "mainnet";
const url = `https://${host}.helius-rpc.com/?api-key=${encodeURIComponent(apiKey)}`;
const response = await fetch(url, {
  method: "POST",
  headers: {"content-type":"application/json"},
  body: JSON.stringify({
    jsonrpc:"2.0",
    id:"helius-skill",
    method:"getAssetsByOwner",
    params:{owner, page:1, limit:1000}
  })
});
const text = await response.text();
if (!response.ok) {
  console.error(`HTTP ${response.status}: ${text}`);
  process.exit(1);
}
console.log(text);
