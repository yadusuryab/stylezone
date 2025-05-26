import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Category } from '../sections/category'



function CategoryCard({ name,slug, image }: Category) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link href={`/categories/${slug.toLowerCase()}`}>
      <div className="w-20 h-20 relative rounded-full shadow-md border">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full"
        />
      </div>
      <p className="text-sm font-medium text-center">{name}</p>
      </Link>
    </div>
  )
}

export default CategoryCard
