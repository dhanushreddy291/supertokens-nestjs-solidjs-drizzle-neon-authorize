import localtunnel from "localtunnel";
import open from "open";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  let tunnel;
  if (!process.env.LOCALTUNNEL_SUBDOMAIN) {
    tunnel = await localtunnel({ port: 3001 });
    const envPath = path.resolve(__dirname, ".env");
    const tunnelSubdomain = splitLocalTunnelUrl(tunnel.url);
    fs.appendFileSync(envPath, `LOCALTUNNEL_SUBDOMAIN=${tunnelSubdomain}\n`);

    console.log(`created new tunnel: ${tunnelSubdomain}`);
  } else {
    tunnel = await localtunnel({
      port: 3001,
      subdomain: process.env.LOCALTUNNEL_SUBDOMAIN,
    });

    const tunnelSubdomain = splitLocalTunnelUrl(tunnel.url);

    if (tunnelSubdomain !== process.env.LOCALTUNNEL_SUBDOMAIN) {
      console.log(`🚨🚨🚨 localtunnel subdomain mismatch 🚨🚨🚨`);
      console.log(
        `you will likely have to re-add this URL to Neon in the Neon Authorize settings`
      );
    } else {
      console.log(`reusing existing tunnel ${tunnelSubdomain}`);
    }
  }

  const jwksURL = `${tunnel.url}/auth/jwt/jwks.json`;

  console.log(`this is your jwks URL: ${jwksURL}`);
  open(jwksURL);
})();

function splitLocalTunnelUrl(url) {
  return url.split("//")[1].split(".")[0];
}
