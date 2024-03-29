import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { env } from "@/env.ts";
import { r2 } from "@/lib/cloudflare.ts";
import { z } from "zod";
import { prisma } from "@/db/prisma.ts";

export const uploadsRoute = (
  server: FastifyInstance,
  options: Record<string, unknown>,
  done: () => void
  ) => {
  server.post('/uploads', async (request: FastifyRequest, reply: FastifyReply) => {
    
    const uploadBodySchema = z.object({
      name: z.string().min(1),
      contentType: z.string().regex(/^[\w\/+.-]+$/i),
    })

    const { name, contentType } = uploadBodySchema.parse(request.body)

    const fileKey = `${name}-${Date.now()}`

    const signedURL = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 600 }
    )

    const file = await prisma.file.create({
      data: {
        name,
        key: fileKey,
        contentType,
      }
    })
  
    reply.code(200).send({
      signedURL,
      fileId: file.id
    })
  });

  server.get('/uploads/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const getFileParamsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = getFileParamsSchema.parse(request.params)

    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id,
      }
    })

    const signedURL = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: file.key,
      }),
      { expiresIn: 600 }
    )

    return signedURL
  })

  done()
}