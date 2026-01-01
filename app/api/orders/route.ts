import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "delhiFrestoDB";

if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it to your .env.local file.");
}

// Reuse MongoClient between hot reloads in dev
let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
  const client = new MongoClient(uri);
  (global as any)._mongoClientPromise = client.connect();
}

clientPromise = (global as any)._mongoClientPromise;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection("orders").insertOne({
      ...body,
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
    });

    return NextResponse.json(
      { ok: true, id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error inserting order", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save order" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const docs = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const orders = docs.map((doc) => ({
      id: doc._id.toString(),
      customerName: doc.customerName ?? "Guest",
      phone: doc.phone ?? "",
      address: doc.address ?? "",
      note: doc.note ?? "",
      items: doc.items ?? [],
      totalAmount: doc.totalAmount ?? 0,
      paymentStatus: doc.paymentStatus ?? "paid",
      deliveryStatus: doc.deliveryStatus ?? "new",
      deliveryArea: doc.deliveryArea ?? "",
      createdAt: doc.createdAt ?? new Date(),
    }));

    return NextResponse.json({ ok: true, orders });
  } catch (error) {
    console.error("Error fetching orders", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load orders" },
      { status: 500 },
    );
  }
}
