import SearchIcon from "../../assets/icons/search.svg";

const SearchBar = () => (
  <form action="/" method="get">
    <label htmlFor="header-search" hidden>
      Buscar
    </label>
    <input
      type="text"
      id="header-search"
      name="s"
      style={{
        width: "200px",
        backgroundColor: "white",
        color: "black",
        borderRadius: "20px",
        padding: "5px",
        border: "none",
        outline: "none",
      }}
    />
    <button type="submit">
      <img
        src={SearchIcon}
        alt="search"
        className="navbar-icon"
        style={{
          filter: "none",
        }}
      />
    </button>
  </form>
);

export { SearchBar };
