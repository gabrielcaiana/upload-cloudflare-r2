import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { env } from "@/env.ts";
import { r2 } from "@/lib/cloudflare.ts";

export const uploadsRoute = (
  server: FastifyInstance,
  options: Record<string, unknown>,
  done: () => void
  ) => {
  server.post('/uploads', async (request: FastifyRequest, reply: FastifyReply) => {

    const signedURL = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: 'my-key',
        ContentType: 'text/plain',
      }),
      { expiresIn: 600 }
    )
  
    reply.code(200).send(signedURL)
  });

  done()
}