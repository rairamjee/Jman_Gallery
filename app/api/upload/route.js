import {S3} from "aws-sdk"
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const s3 = new S3({
    accessKeyId: process.env.UPLOAD_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.UPLOAD_AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

export async function POST(req) {
    try {
        const { originalFileName, contentType, eventId, uploadedBy } = await req.json();
        if (!originalFileName || !contentType || !eventId || !uploadedBy) {
            return new Response(
                JSON.stringify({
                    error: "All the fields are Required",
                }),
                {
                    status: 400
                }
            )
        }
        
        const event = await prisma.events.findUnique({
            where: { eventId: parseInt(eventId) },
        });
        
        if (!event) {
            return new Response(
                JSON.stringify({
                    error: "No such Event Found"
                }),
                {
                    status: 404
                }
            )
        }
        
        const ext = originalFileName.split('.').pop().toLowerCase();
        const date = format(new Date(), 'yyyyMMdd');
        const key = `upload/${date}-${uuidv4()}.${ext}`;
        const s3url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
        
        // Generate pre-signed URL
        const presignedUploadUrl = await s3.getSignedUrlPromise("putObject", {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            Expires: 60 * 60, // 1 hour expiration
        });
        
        return new Response(
            JSON.stringify({
                key,
                presignedUploadUrl,
                s3url
            }),
            {
                status:200
            }
        )
    } catch (error) {
        console.log("Error :",error);
        return new Response(
            JSON.stringify({
                error:"Error Generating the Presigned link"
            })
        )
    }
}