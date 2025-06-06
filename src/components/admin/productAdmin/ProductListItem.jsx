import React from 'react';
import { Eye, Edit, Trash } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProductListItem = ({ product, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden">
            <img 
              src={product.images[0].imageUrl || 'https://picsum.photos/200/300?grayscale' } 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4 ">
            <div className="font-medium  text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.id}</div>
          </div>
        </div>
      </td>
            <td className="px-4 py-4 whitespace-nowrap text-left text-sm text-gray-500">{product.description}</td>

      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{`$${product.price}`}</td>
      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.stock ? product.stock : 0}</td>
      {/* <td className="px-4 py-4 whitespace-nowrap">
        <StatusBadge status={product.status} />
      </td> */}
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium ">
        <div className="flex space-x-2 justify-center">
          <button onClick={() => onView(product)} className="cursor-pointer text-blue-600 hover:text-blue-900" title="Xem chi tiết">
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={() => onEdit(product)} className="cursor-pointer text-orange-500 hover:text-orange-700" title="Sửa">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(product)} className="cursor-pointer text-red-500 hover:text-red-700" title="Xóa">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductListItem;