import React from "react";
import ImageCarousel_Basic, {
  CarouselImages,
} from "@/components/commerce-ui/image-carousel-basic";
import PriceFormat_Sale from "@/components/commerce-ui/price-format-sale";
import ProductReviewSection from "@/components/sections/reviews";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/queries/product";
import AddToCartButton from "@/components/utils/add-to-cart";
import ProductBuySection from "@/components/sections/product-add-to-cart";
import StarRating_Basic from "@/components/commerce-ui/star-rating-basic";

interface Props {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <p className="p-4 text-center text-red-600">Product not found.</p>;
  }
  return (
    <div className="min-h-screen px-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ImageCarousel_Basic
          images={product.images}
          imageFit="contain"
          classNameImage={"object-fit-contain"}
        />
        <div>
          <h2 className="md:text-2xl text-xl font-medium tracking-tight">
            {product.name}
          </h2>
          <div className="mt-4">
          <StarRating_Basic value={product.rating} readOnly iconSize={18} />
          </div>
          <div className="mt-4">
            {product.salesPrice ? (
              <>
                <span className="font-semibold text-primary mt-2 text-sm">
                  Special Price
                </span>
                <PriceFormat_Sale
                  originalPrice={product.price}
                  salePrice={product.salesPrice}
                  prefix="₹"
                  showSavePercentage={true}
                  classNameSalePrice="text-2xl"
                />
              </>
            ) : (
              <PriceFormat_Sale
                originalPrice={product.price}
                prefix="₹"
                classNameSalePrice="text-2xl"
              />
            )}
          </div>
         
          <div className="mt-4">
            <ProductBuySection product={product} />
          </div>
          <div className="mt-4 bg-accent p-3 rounded-md">
            <h3 className="text-md font-semibold">Features</h3>
            <ul className="list-disc pl-4 text-muted-foreground">
              {product.features?.map((feat:any) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 bg-accent p-3 rounded-md">
            <h3 className="text-md font-semibold">About this Product.</h3>
            <p className="text-muted-foreground md:text-md text-sm">
              {product.description}
            </p>
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-md font-semibold mt-4">Description</h3>
          <p className="text-muted-foreground md:text-md text-sm mb-4">
            {product.description}
          </p>
          <ProductReviewSection productId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
