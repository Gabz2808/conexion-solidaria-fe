import SearchIcon from "../../assets/icons/search.svg";

const SearchBar = () => (
  <form
    action="/"
    method="get"
    className="flex items-center rounded-full bg-white px-3 py-1"
  >
    <label htmlFor="header-search" className="sr-only">
      Buscar
    </label>
    <input
      type="text"
      id="header-search"
      name="s"
      placeholder="Buscar..."
      className="flex-grow border-none outline-none px-2 text-sm text-gray-700"
    />
    <button type="submit" className="p-1">
      <img src={SearchIcon} alt="search" className="h-5 w-5 text-gray-600" />
    </button>
  </form>
);

export { SearchBar };
