import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const db = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const response = await db`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})`;

    return new Response(JSON.stringify({ response }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user", { status: 500 });
  }
}
