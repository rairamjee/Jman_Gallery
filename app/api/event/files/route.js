import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const eventId = url.searchParams.get("eventId");

    const event = await prisma.events.findUnique({
      where: {
        eventId: parseInt(eventId),
      },
    });

    if (!event) {
      return new Response(
        JSON.stringify({
          error: "Event Not Found",
        }),
        {
          status: 400,
        }
      );
    }

    const eventFiles = await prisma.files.findMany({
      where: {
        eventId: parseInt(eventId),
      },
    });

    return new Response(
      JSON.stringify({
        message: "List of all the files",
        data: eventFiles,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error :", error);

    return new Response(
      JSON.stringify({
        error: "Error Fetching the Event Files",
      }),
      {
        status: 500,
      }
    );
  }
}
