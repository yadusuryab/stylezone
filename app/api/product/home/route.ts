import { sanityClient } from '@/lib/sanity'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const home = searchParams.get('home')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const start = (page - 1) * limit

  try {
    let query = ''
    let params = {}

    if (home === 'true') {
      // Only fetch 4 latest products for homepage
      query = `
        *[_type == "product"] | order(_createdAt desc)[0...4]{
          _id,
          name,
          rating,
          "image": images[0].asset->url,
          price,
          salesPrice,
          
          featured
        }
      `
    } else {
      // Paginated full product list
      query = `
        *[_type == "product"] | order(_createdAt desc)[${start}...${start + limit}]{
          _id,
          name,
          "images": images[].asset->url,
          price, 
          rating,
          salesPrice,
          sizes,
          features,
          description,
          featured,
          "category": category->title
        }
      `
    }

    const products = await sanityClient.fetch(query, params)

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Fetch failed', error }, { status: 500 })
  }
}
