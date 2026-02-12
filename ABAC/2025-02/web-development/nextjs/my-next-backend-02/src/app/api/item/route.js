import { NextResponse } from "next/server";
import { getClientPromise } from "@/lib/mongodb";
import corsHeaders from "@/lib/cors";

export async function GET() {

  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    ...corsHeaders
  };

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");
    const result = await db.collection("item").find({}).toArray();

    return NextResponse.json(result, {
      headers: headers
    });

  } catch (exception) {
    return NextResponse.json(
      { message: exception.toString() },
      { status: 400, headers: corsHeaders }
    );
  }
}