
import Stripe from "stripe";
import limitDecimalPlaces from "@/actions/limit-number-decimal";
import { stripe } from "@/lib/stripe";
import axios from "axios";
export default async function getStripeUrl(params: any) {
  if (params) {
    const { OrderTotal, API_KEY, OrderId, ServiceName, Email, OriginUrl } =
      params;
    try {
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: ServiceName,
            },
            unit_amount_decimal: `${limitDecimalPlaces(OrderTotal * 100, 2)}`,
          },
          quantity: 1,
        },
      ];

      const Order = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/api/checkout`,
        {
          API_KEY,
          OrderId,
          ServiceName,
          OrderTotal,
        },
      );
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/api/success`,
        cancel_url: `${process.env.FRONTEND_URL}/api/cancel`,
        customer_email: Email,
        metadata: {
          orderId: Order?.data?.order?.id,
        },
      });

      return session.url;
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
