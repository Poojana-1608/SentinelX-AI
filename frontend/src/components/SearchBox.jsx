import { FaSearch } from "react-icons/fa";

function SearchBox({ placeholder = "Search..." }) {
  return (
    <div className="relative">

      <FaSearch className="absolute left-4 top-4 text-gray-400" />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
      />

    </div>
  );
}

export default SearchBox;