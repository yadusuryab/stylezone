// app/api/create-order/route.ts
import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";
import { TelegramService } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // 1. Create the order in Sanity
    // Wrap product ID as a reference
    const createdOrder = await sanityClient.create({
      _type: "order",
      ...orderData,
      orderedAt: new Date().toISOString(),
      products: orderData.products.map((item: any) => ({
        ...item,
        product: {
          _type: "reference",
          _ref: item.product, // this should be the product ID string
        },
      })),
    });


    // 2. Update product quantities
    for (const item of orderData.products) {
      // Get current product data
      const product = await sanityClient.getDocument(item.product);

      if (!product) continue;

      const newQuantity = (product.quantity || 0) - item.quantity;
      const soldOut = newQuantity <= 0;

      await sanityClient
        .patch(item.product)
        .set({
          quantity: newQuantity,
          soldOut: soldOut,
        })
        .commit();
    }
    // 3. Send Telegram notification
const fullOrder = await sanityClient.fetch(
  `*[_type == "order" && _id == $id][0]{
    ...,
    products[]{
      quantity,
      size,
      color,
      product->{
        _id,
        name,
      }
    }
  }`,
  { id: createdOrder._id }
);

await TelegramService.sendOrderNotification(fullOrder);


    return NextResponse.json(
      { success: true, orderId: createdOrder._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}
