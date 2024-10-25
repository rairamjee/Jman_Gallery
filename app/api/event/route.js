import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {

    // Desturing and getting the Values 

    const {
        eventName,
        eventType,
        eventLocation,
        eventOfficeLocation,
        eventStartDate,
        eventEndDate,
        eventCreatedBy,
    } = await req.json();


    // Logging the values To Check The Data

    console.log(
        eventName,
        eventType,
        eventLocation,
        eventOfficeLocation,
        eventStartDate,
        eventEndDate,
        eventCreatedBy
    );

    try {
        // If the data is empty sending a valid response 

        if (!eventName || !eventType || !eventLocation || !eventOfficeLocation || !eventStartDate || !eventEndDate ||!eventCreatedBy) {
            return new Response(
                JSON.stringify({
                    error: "All Fields are Required",
                }),
                {
                    status: 400,
                }
            );
        }


        // Creating the Event

        const event = await prisma.events.create({
            data: {
                eventName,
                eventType,
                eventLocation,
                eventOfficeLocation,
                eventStartDate:new Date(eventStartDate),
                eventEndDate:new Date(eventEndDate),
                eventCreatedBy,
            },
        });
        

        // Sending a success Response 
        return new Response(
            JSON.stringify({
                message:"Event created Successfully",
                data:event
            }),
            {
                status:201
            }
        )
    } catch (error) { 

        console.log("Error : ",error);

        return new Response(
            JSON.stringify({
                error:error
            }),
            {
                status:500
            }
        )
    }
}
