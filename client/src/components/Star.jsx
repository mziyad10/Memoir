import { FaStar } from 'react-icons/fa';

const Star = ({ filled, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <FaStar
        className={`text-xl sm:text-2xl ${
          filled ? 'text-red-600' : 'text-gray-500'
        }`}
      />
    </div>
  );
};

export default Star;
