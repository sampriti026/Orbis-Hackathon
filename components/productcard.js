import { useState } from 'react'

const ProductCard = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
      <div className="w-1/3">
        <h3 className="text-2xl font-bold leading-tight mb-2">Product Name</h3>
        <p className="text-gray-600 leading-normal mb-2">Product tagline</p>
      </div>
      <div className="w-2/3 ml-auto flex items-center justify-end">
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
          Upvote
        </button>
        <div className="ml-4">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`text-yellow-500 ${
                rating >= star ? 'fas' : 'far'
              } fa-star cursor-pointer`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
