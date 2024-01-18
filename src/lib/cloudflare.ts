import * as AWS from "@aws-sdk/client-s3";
import { env } from "../env.ts";

const r2 = new AWS.S3({ 
  region: "auto",
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID || '',
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY || ''
  }
 });

export { r2 }