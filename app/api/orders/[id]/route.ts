import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "delhiFrestoDB";

if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it to your .env.local file.");
}

let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
  const client = new MongoClient(uri);
  (global as any)._mongoClientPromise = client.connect();
}

clientPromise = (global as any)._mongoClientPromise;

async function getIdParam(params: any) {
  const resolved = await params;
  const raw = resolved?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;

  if (!id || typeof id !== "string") {
    return null;
  }

  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function GET(_request: Request, context: any) {
  const objectId = await getIdParam(context?.params);
  if (!objectId) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const doc = await db.collection("orders").findOne({ _id: objectId });
    if (!doc) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const order = {
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
    };

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Error fetching order", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load order" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: any) {
  const objectId = await getIdParam(context?.params);
  if (!objectId) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(dbName);

    const allowedFields = [
      "customerName",
      "phone",
      "address",
      "note",
      "items",
      "totalAmount",
      "paymentStatus",
      "deliveryStatus",
      "deliveryArea",
    ];

    const update: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) {
        update[key] = body[key];
      }
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { ok: false, error: "No valid fields to update" },
        { status: 400 },
      );
    }

    const rawResult = await db
      .collection("orders")
      .findOneAndUpdate(
        { _id: objectId },
        { $set: update },
        { returnDocument: "after" },
      );

    const doc: any =
      rawResult && typeof rawResult === "object" && "value" in rawResult
        ? (rawResult as any).value
        : rawResult;

    if (!doc) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const order = {
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
    };

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error("Error updating order", error);
    return NextResponse.json(
      { ok: false, error: "Failed to update order" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: any) {
  const objectId = await getIdParam(context?.params);
  if (!objectId) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db.collection("orders").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting order", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete order" },
      { status: 500 },
    );
  }
}
