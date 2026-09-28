#!/usr/bin/env node
const account = process.argv[2];
if (!account) {
  console.error("Usage: node scripts/priority-fee.mjs <account>");
  process.exit(2);
}
if (!process.env.HELIUS_API_KEY) {
  console.error("Missing HELIUS_API_KEY");
  process.exit(1);
}
const network = process.env.HELIUS_NETWORK || "mainnet";
const host = network === "devnet" ? "devnet" : "mainnet";
const url = `https://${host}.helius-rpc.com/?api-key=${encodeURIComponent(process.env.HELIUS_API_KEY)}`;
const response = await fetch(url, {
  method: "POST",
  headers: {"content-type":"application/json"},
  body: JSON.stringify({
    jsonrpc:"2.0",
    id:"helius-skill",
    method:"getPriorityFeeEstimate",
    params:[{accountKeys:[account]}]
  })
});
const text = await response.text();
if (!response.ok) {
  console.error(`HTTP ${response.status}: ${text}`);
  process.exit(1);
}
console.log(text);
