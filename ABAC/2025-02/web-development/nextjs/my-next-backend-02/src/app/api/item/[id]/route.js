import corsHeaders from "@/lib/cors";
import { getClientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/* ---------- OPTIONS (CORS preflight) ---------- */
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

/* ---------- GET : get item by id ---------- */
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    const result = await db
      .collection("item")
      .findOne({ _id: new ObjectId(id) });

    console.log("==> result", result);

    return NextResponse.json(result, {
      headers: corsHeaders,
    });
  } catch (exception) {
    console.log("exception", exception.toString());

    return NextResponse.json(
      { message: exception.toString() },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
}

/* ---------- PATCH : partial update ---------- */
export async function PATCH(req, { params }) {
  const { id } = params;
  const data = await req.json(); // partial data
  const partialUpdate = {};

  if (data.name != null) partialUpdate.itemName = data.name;
  if (data.category != null) partialUpdate.itemCategory = data.category;
  if (data.price != null) partialUpdate.itemPrice = data.price;

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    const existedData = await db
      .collection("item")
      .findOne({ _id: new ObjectId(id) });

    const updateData = { ...existedData, ...partialUpdate };

    const updatedResult = await db.collection("item").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json(updatedResult, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (exception) {
    return NextResponse.json(
      { message: exception.toString() },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
}

/* ---------- PUT : full update ---------- */
export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json(); // full item data

  try {
    const client = await getClientPromise();
    const db = client.db("wad-01");

    const updatedResult = await db.collection("item").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    return NextResponse.json(updatedResult, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (exception) {
    console.log("exception", exception.toString());

    return NextResponse.json(
      { message: exception.toString() },
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }
}