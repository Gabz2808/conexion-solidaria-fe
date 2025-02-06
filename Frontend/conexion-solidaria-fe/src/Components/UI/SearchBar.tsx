const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);
 
export { SearchBar };