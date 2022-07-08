import { Icon } from "@iconify/react";
import lS from "manager-local-storage";
import React, { useContext } from "react";
import { CardsContext } from "../../context/CardsContext";

function Card({ card, isSaved}) {

  const { setCards } = useContext(CardsContext);

  const defineRareness = () => {
    const cardValue =
      (Number(card.attr1Value) +
        Number(card.attr2Value) +
        Number(card.attr3Value)) /
      3;
    if (cardValue < 20) return "common";
    if (cardValue >= 20 && cardValue < 40) return "uncommon";
    if (cardValue >= 40 && cardValue < 60) return "rare";
    if (cardValue >= 60 && cardValue < 80) return "epic";
    if (cardValue >= 80 && cardValue < 100) return "legendary";
    if (cardValue === 100) return "trunfo";
  };

  const removeCard = () => {
    const newCards = lS("g", "biewwl-trunfo-cards").filter((savedCard) => savedCard.name !== card.name);
    lS("s", "biewwl-trunfo-cards", newCards);
    setCards(newCards);
  };

  return (
    <section className={`card card-${defineRareness()}`}>
      {isSaved && (
        <span className="remove-card" onClick={removeCard}>
          <Icon icon="akar-icons:circle-x-fill" />
        </span>
      )}
      <span className="name">{card.name}</span>
      <img src={card.image} alt={card.name} />
      <p className="description">{card.description}</p>
      <div>
        <span className="attr">{card.attr1Name} ................................................................</span>
        <span className="attr-value">{Number(card.attr1Value)}</span>
      </div>
      <div>
        <span className="attr">{card.attr2Name} ................................................................</span>
        <span className="attr-value">{Number(card.attr2Value)}</span>
      </div>
      <div>
        <span className="attr">{card.attr3Name} ................................................................</span>
        <span className="attr-value">{Number(card.attr3Value)}</span>
      </div>
    </section>
  );
}

export default Card;
