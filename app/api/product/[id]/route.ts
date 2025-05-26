import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    name,
    images[]{asset->{_id, url}},
    price,
    rating,
    salesPrice,
    sizes,
    features,
    quantity,
    description,
    category->{_id, title},
    featured
  }`;

  try {
    const product = await sanityClient.fetch(query, { id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Transform images to array of URLs
    const images = product.images?.map((img: any) => ({
      url: img.asset.url,
      title: img.asset.title,
    })) || [];

    return NextResponse.json({ ...product, images });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
