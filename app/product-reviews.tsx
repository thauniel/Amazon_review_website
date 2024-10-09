'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"

// Mock data for demonstration
const categories: string[] = ["Electronics", "Clothing", "Books", "Home & Kitchen"]
const products: Record<string, string[]> = {
  "Electronics": ["Smartphone", "Laptop", "Headphones"],
  "Clothing": ["T-Shirt", "Jeans", "Dress"],
  "Books": ["Fiction", "Non-Fiction", "Textbook"],
  "Home & Kitchen": ["Blender", "Coffee Maker", "Toaster"]
}

const reviews: Record<string, { positive: string; negative: string }> = {
  "Smartphone": {
    positive: "Great camera and long battery life!",
    negative: "A bit expensive compared to similar models."
  },
  "T-Shirt": {
    positive: "Very comfortable and fits perfectly.",
    negative: "The color faded after a few washes."
  },
  // Add more reviews for other products as needed
}

export function ProductReviewsComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])
  const [selectedProduct, setSelectedProduct] = useState<string>(products[selectedCategory][0])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setSelectedCategory(newCategory)
    setSelectedProduct(products[newCategory][0])
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <select
            className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <select
            className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {products[selectedCategory].map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsUp className="mr-2 text-green-500" />
              Positive Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{reviews[selectedProduct]?.positive || "No positive review available."}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsDown className="mr-2 text-red-500" />
              Negative Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{reviews[selectedProduct]?.negative || "No negative review available."}</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link href={`/product-details/${selectedProduct}`}>
          <Button size="lg">More Detail</Button>
        </Link>
      </div>
    </div>
  )
}
