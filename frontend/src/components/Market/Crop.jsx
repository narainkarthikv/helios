import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Crop = ({ crop, quantity, incrementQuantity, decrementQuantity, deleteCrop }) => {
  
  const getClassByQuantity = (quantity) => {
    if (quantity <= 25) {
      return 'bg-red-100';
    } else if (quantity >= 100) {
      return 'bg-green-100';
    } else {
      return 'bg-yellow-100';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${getClassByQuantity(quantity)}`}>
      <h3 className='text-lg font-semibold'>{crop.Name} (₹ {crop.Price})</h3>
      <button className='text-red-500 hover:text-red-700' onClick={deleteCrop}><FaTrash /></button>
      <div className='flex items-center mt-2'>
        <button className='text-green-500 hover:text-green-700' onClick={incrementQuantity}> <FaPlus/> </button>
        <h3 className='mx-2'>{quantity}</h3>
        <button className='text-yellow-500 hover:text-yellow-700' onClick={decrementQuantity}> <FaMinus/> </button>
      </div>
    </div>
  );
};

export default Crop;
