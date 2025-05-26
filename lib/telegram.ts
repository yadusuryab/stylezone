// lib/telegram.ts
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export const Telegram = {
  async sendOrderNotification(order: any) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn("Telegram credentials not configured");
      return;
    }

    try {
      const message = `
        🛍️ *New Order Received* 🛍️
        
        *Order ID:* ${order._id}
        *Customer:* ${order.customerName}
        *Phone:* ${order.phoneNumber}
        *Amount:* ₹${order.totalAmount}
        *Payment Mode:* ${
          order.paymentMode === "cod" ? "Cash on Delivery" : "Online"
        }
        
       *Products:* ${
        order.products.map((p: any) =>`- [${p.name}](https://yourdomain.com/product/${p.productId}) (Qty: ${p.quantity})`).join("\n")}

        *Shipping Address:*
        ${order.address}, ${order.district}, ${order.state} - ${order.pincode}
      `;

      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
    }
  },
};
