import { createContext, useEffect, useState } from "react";
import lS from "manager-local-storage";

export const CardsContext = createContext();

const savedCards = lS("g", "biewwl-trunfo-cards") || [];

const CardsProvider = ({ children }) => {

  const [cards, setCards] = useState(savedCards);

  const [filters, setFilters] = useState({
    name: "",
    trunfo: false,
    sort: "creation",
  });

  return (
    <CardsContext.Provider value={{ cards, setCards, filters, setFilters }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
