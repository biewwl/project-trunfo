import { Icon } from "@iconify/react";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import "./styles/Filters.css";
import "./styles/Filters-mobile.css";

function Filters() {
  const { filters, setFilters } = useContext(CardsContext);

  const handleChange = ({ target }) => {
    if (target.name === "trunfo") {
      setFilters({ ...filters, trunfo: target.checked });
    } else {
      setFilters({ ...filters, [target.name]: target.value });
    }
  };

  return (
    <section className="filters">
      <label
        htmlFor="trunfo-checkbox"
        className={`trunfo-option ${filters.trunfo ? "on" : "off"}`}
      >
        <input
          type="checkbox"
          id="trunfo-checkbox"
          name="trunfo"
          onChange={handleChange}
          checked={filters.trunfo}
        />
        <span>Trunfo</span>
        {filters.trunfo ? (
          <Icon icon="bi:toggle2-on" />
        ) : (
          <Icon icon="bi:toggle2-off" />
        )}
      </label>
      <label htmlFor="search-name-input">
        <input
          type="text"
          id="search-name-input"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Search by name"
        />
      </label>
      <label
        htmlFor="creation"
        className={filters.sort === "creation" ? "selected" : ""}
      >
        <input
          type="radio"
          id="creation"
          name="sort"
          value="creation"
          onChange={handleChange}
          checked={filters.sort === "creation"}
        />
        Creation
      </label>
      <label
        htmlFor="strongest"
        className={filters.sort === "strongest" ? "selected" : ""}
      >
        <input
          type="radio"
          id="strongest"
          name="sort"
          value="strongest"
          onChange={handleChange}
          checked={filters.sort === "strongest"}
        />
        Strongest
      </label>
      <label
        htmlFor="weakest"
        className={filters.sort === "weakest" ? "selected" : ""}
      >
        <input
          type="radio"
          id="weakest"
          name="sort"
          value="weakest"
          onChange={handleChange}
          checked={filters.sort === "weakest"}
        />
        Weakest
      </label>
      <label htmlFor="az" className={filters.sort === "az" ? "selected" : ""}>
        <input
          type="radio"
          id="az"
          name="sort"
          value="az"
          onChange={handleChange}
          checked={filters.sort === "az"}
        />
        <Icon icon="bi:sort-alpha-down" />
      </label>
      <label htmlFor="za" className={filters.sort === "za" ? "selected" : ""}>
        <input
          type="radio"
          id="za"
          name="sort"
          value="za"
          onChange={handleChange}
          checked={filters.sort === "za"}
        />
        <Icon icon="bi:sort-alpha-down-alt" />
      </label>
    </section>
  );
}

export default Filters;
