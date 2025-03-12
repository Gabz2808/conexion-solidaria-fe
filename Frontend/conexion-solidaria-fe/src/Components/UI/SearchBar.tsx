import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?s=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center rounded-full bg-white px-3 py-1"
    >
      <label htmlFor="header-search" className="sr-only">
        Buscar
      </label>
      <input
        type="text"
        id="header-search"
        name="s"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
        className="flex-grow border-none outline-none px-2 text-sm text-gray-700"
      />
      <button type="submit" className="p-1">
        <img src={SearchIcon} alt="search" className="h-5 w-5 text-gray-600" />
      </button>
    </form>
  );
};

export { SearchBar };
