import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    try {
      const order = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/webhook`, {
        id: session?.metadata?.orderId,
        isPaid: true,
        name: session?.customer_details?.name || "",
        email: session?.customer_details?.email || "",
      });
      return NextResponse.json(order);
    } catch (error) {
      return new NextResponse(error, { status: 450 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
