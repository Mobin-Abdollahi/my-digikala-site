// src/app/components/product/productCard.tsx
import React from 'react';
import { Product } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
      {/* تصویر محصول */}
      <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-md">
        <span className="text-gray-400 text-xs">تصویر محصول</span>
        {/* بعداً از Image استفاده می‌کنیم */}
      </div>

      {/* عنوان */}
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-4 leading-6 h-12">
        {product.title}
      </h3>

      {/* قیمت و امتیاز */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-500 text-xs">⭐ {product.rating}</span>
          {product.discount && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {product.discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            <span className="text-[10px]">تومان</span>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">
        افزودن به سبد
      </button>
    </div>
  );
};

export default ProductCard;
