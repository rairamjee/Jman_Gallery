import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()


export async function POST(req){
    try {
        const {key,fileName,contentType,uploadedBy,eventId} = await req.json();

        if(!key || !fileName || !contentType || !uploadedBy|| !eventId){
            return new Response(
                JSON.stringify({
                    error:"Required Fields are Missing"
                }),
                {
                    status:400
                }
            )
        }

        const event =await prisma.events.findUnique({
            where:{
                eventId:parseInt(eventId)
            }
        })

        if(!event){
            return new Response(
                JSON.stringify({
                    error:"Event Doest not Exist"
                }),
                {
                    status:404
                }
            )
        }

        const eventFile = await prisma.files.create({
            data:{
                key,
                fileName,
                contentType,
                s3Url:`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
                uploadedBy,
                eventId:parseInt(eventId)
            }
        })

        return new Response(
            JSON.stringify({
                message:"File Saved Successfully"
            }),
            {
                status:201
            }
        )
    } catch (error) {
        console.log("Error :",error);
        return new Response(
            JSON.stringify({
                error:"Failed to save to Database"
            }),
            {
                status:500
            }
        )
    }
}