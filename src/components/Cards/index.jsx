import lS from "manager-local-storage";
import { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";
import Card from "../Card";

function Cards() {
  const { cards, filters } = useContext(CardsContext);

  const sumAttr = (card) => {
    return (
      (Number(card.attr1Value) +
        Number(card.attr2Value) +
        Number(card.attr3Value)) /
      3
    );
  };

  const isTrunfo = (card) => {
    return sumAttr(card) === 100;
  };

  const getSavedCards = () => lS("g", "biewwl-trunfo-cards");

  const filteredCards = () => {
    let cards = [];
    if (filters.trunfo) {
      cards = getSavedCards().filter(isTrunfo);
    } else {
      if (filters.sort === "creation") cards = getSavedCards();
      if (filters.sort === "az")
        cards = getSavedCards().sort((a, b) => a.name.localeCompare(b.name));
      if (filters.sort === "za")
        cards = getSavedCards().sort((a, b) => b.name.localeCompare(a.name));
      if (filters.sort === "strongest")
        cards = getSavedCards().sort((a, b) => sumAttr(b) - sumAttr(a));
      if (filters.sort === "weakest")
        cards = getSavedCards().sort((a, b) => sumAttr(a) - sumAttr(b));
    }
    cards = cards.filter((card) => {
      return card.name.toLowerCase().includes(filters.name.toLowerCase());
    });
    return cards;
  };

  return (
    <section className="saved-cards">
      {filteredCards(cards).map((card, index) => (
        <Card card={card} key={index} isSaved={true} />
      ))}
    </section>
  );
}

export default Cards;
