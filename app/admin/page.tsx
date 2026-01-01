"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type OrderItem = {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  deliveryStatus: string;
  deliveryArea?: string;
  createdAt: string | Date;
};

async function fetchOrders(): Promise<Order[]> {
  const res = await fetch("/api/orders", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load orders");
  }
  const data = await res.json();
  return data.orders as Order[];
}

function formatCurrency(amount: number) {
  return `₹${amount.toFixed(0)}`;
}

function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleString();
}
// Reuse a single AudioContext so short beeps can play
// even when the tab is in the background (subject to
// the browser's audio/autoplay policies).
let sharedAudioContext: any = null;

function playBeep() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    if (!sharedAudioContext) {
      sharedAudioContext = new AudioCtx();
    }

    const ctx = sharedAudioContext as any;
    if (ctx.state === "suspended" && typeof ctx.resume === "function") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.error("Failed to play beep", e);
  }
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const hasLoadedOnceRef = useRef(false);

  // Poll for new orders every 5 seconds
  useEffect(() => {
    let active = true;

    async function load(initial = false) {
      if (initial) {
        setLoading(true);
        setError(null);
      }
      try {
        const data = await fetchOrders();
        if (!active) return;
        if (!hasLoadedOnceRef.current) {
          // First load: just set without beeping for existing orders
          setOrders(data);
          hasLoadedOnceRef.current = true;
        } else {
          // Subsequent loads: detect new orders and beep
          setOrders((prev) => {
            const prevIds = new Set(prev.map((o) => o.id));
            const hasNew = data.some((o) => !prevIds.has(o.id));
            if (hasNew) {
              playBeep();
            }
            return data;
          });
        }
      } catch (err) {
        console.error(err);
        if (!active) return;
        setError("Could not load orders");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    load(true);
    const id = setInterval(() => load(false), 5000);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const totals = useMemo(() => {
    const count = orders.length;
    const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    return { count, revenue };
  }, [orders]);

  async function updateOrder(id: string, patch: Partial<Order>) {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        throw new Error("Failed to update order");
      }
      const data = await res.json();
      const updated = data.order as Order;
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      console.error(err);
      alert("Could not update order");
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteOrder(id: string) {
    if (!confirm("Delete this order?")) return;
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete order");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-4xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Delhi Fresto – Orders</h1>
            <p className="text-xs text-zinc-400">
              Live view of incoming orders (auto-refresh every 5s)
            </p>
          </div>
          <div className="rounded-xl bg-zinc-900 px-3 py-2 text-xs">
            <div>Total orders: {totals.count}</div>
            <div>Revenue: {formatCurrency(totals.revenue)}</div>
          </div>
        </header>

        {loading && orders.length === 0 && (
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-300">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="mb-3 rounded-xl bg-red-900/40 p-3 text-xs text-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 && !loading ? (
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-300">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <article
                key={order.id}
                className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-zinc-500">
                      {order.deliveryStatus || "new"} • {order.paymentStatus || "paid"}
                    </div>
                    <div className="text-sm font-semibold">
                      {order.customerName || "Guest"}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {formatDate(order.createdAt)} • {order.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold">
                      {formatCurrency(order.totalAmount || 0)}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {order.deliveryArea || ""}
                    </div>
                  </div>
                </div>

                <div className="mt-1 grid gap-2 md:grid-cols-[2fr,1fr]">
                  <div className="space-y-1">
                    <div className="font-medium text-[11px] text-zinc-400">
                      Items
                    </div>
                    <ul className="space-y-0.5">
                      {order.items.map((item) => (
                        <li
                          key={item.itemId + item.name}
                          className="flex justify-between text-[11px] text-zinc-300"
                        >
                          <span>
                            {item.quantity} × {item.name}
                          </span>
                          <span>
                            {formatCurrency(item.quantity * item.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-[11px] text-zinc-400">
                      Address & note
                    </div>
                    <div className="rounded-xl bg-zinc-950/60 p-2 text-[11px] text-zinc-300">
                      <div>{order.address}</div>
                      {order.note && (
                        <div className="mt-1 text-amber-300">
                          Note: {order.note}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 pt-2">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <label className="flex items-center gap-1">
                      <span className="text-zinc-400">Payment</span>
                      <select
                        value={order.paymentStatus || "paid"}
                        onChange={(e) =>
                          updateOrder(order.id, { paymentStatus: e.target.value })
                        }
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-100"
                        disabled={updatingId === order.id}
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="failed">failed</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-1">
                      <span className="text-zinc-400">Delivery</span>
                      <select
                        value={order.deliveryStatus || "new"}
                        onChange={(e) =>
                          updateOrder(order.id, { deliveryStatus: e.target.value })
                        }
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-100"
                        disabled={updatingId === order.id}
                      >
                        <option value="new">new</option>
                        <option value="preparing">preparing</option>
                        <option value="out-for-delivery">out for delivery</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <button
                      onClick={() => updateOrder(order.id, { deliveryStatus: "delivered" })}
                      disabled={updatingId === order.id}
                      className="rounded-full bg-emerald-600 px-3 py-1 font-medium text-white disabled:cursor-not-allowed disabled:bg-emerald-500"
                    >
                      Mark delivered
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      disabled={updatingId === order.id}
                      className="rounded-full border border-red-500 px-3 py-1 font-medium text-red-300 disabled:cursor-not-allowed disabled:border-red-500/60 disabled:text-red-500/70"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
