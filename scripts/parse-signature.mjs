#!/usr/bin/env node
const signature = process.argv[2];
if (!signature) {
  console.error("Usage: node scripts/parse-signature.mjs <signature>");
  process.exit(2);
}
if (!process.env.HELIUS_API_KEY) {
  console.error("Missing HELIUS_API_KEY");
  process.exit(1);
}
const network = process.env.HELIUS_NETWORK || "mainnet";
const host = network === "devnet" ? "devnet" : "mainnet";
const url = `https://${host}.helius-rpc.com/v1/parsed-events/transactions?api-key=${encodeURIComponent(process.env.HELIUS_API_KEY)}`;
const response = await fetch(url, {
  method: "POST",
  headers: {"content-type":"application/json"},
  body: JSON.stringify({transactions:[signature]})
});
const text = await response.text();
if (!response.ok) {
  console.error(`HTTP ${response.status}: ${text}`);
  process.exit(1);
}
console.log(text);
