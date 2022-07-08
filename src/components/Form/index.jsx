import { useState, useContext } from "react";
import lS from "manager-local-storage";
import Card from "../Card";
import "./styles/Form.css";
import "./styles/Form-mobile.css";
import { CardsContext } from "../../context/CardsContext";

function Form() {
  const { cards, setCards, filters, setFilters } = useContext(CardsContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    attr1Name: "",
    attr1Value: "",
    attr2Name: "",
    attr2Value: "",
    attr3Name: "",
    attr3Value: "",
  });

  const savedCards = lS("g", "biewwl-trunfo-cards") || [];

  const onSubmit = (e) => {
    e.preventDefault();
    lS("s", "biewwl-trunfo-cards", [...savedCards, formData]);
    setCards([...savedCards, formData]);
  };

  const handleChange = ({ target }) => {
    if (Number(target.value) > 100) {
      setFormData({ ...formData, [target.name]: "100" });
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const onlyNumber = (evt) => {
    const theEvent = evt || window.event;
    const keyCodes = [
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105, 8, 37, 39, 46,
    ];
    if (keyCodes.some((e) => e === theEvent.keyCode))
      theEvent.returnValue = true;
    else {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const {
    name,
    image,
    description,
    attr1Name,
    attr1Value,
    attr2Name,
    attr2Value,
    attr3Name,
    attr3Value,
  } = formData;

  const isTrunfo = (card) => {
    const cardValue =
      (Number(card.attr1Value) +
        Number(card.attr2Value) +
        Number(card.attr3Value)) /
      3;
    return cardValue === 100;
  };

  const existTrunfo = cards.some(isTrunfo);
  const existName = cards.some((card) => card.name === name);

  const savedDisabled = () => {
    const valuesOfForm = Object.values(formData);
    return (
      valuesOfForm.some((value) => value === "") ||
      existName ||
      (existTrunfo && isTrunfo(formData))
    );
  };

  return (
    <section className="create-container">
      <form action="GET">
        <h1>Make your Trunfo!</h1>
        <label htmlFor="name-input">
          <input
            type="text"
            id="name-input"
            placeholder="Name:"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image-input">
          <input
            type="text"
            id="image-input"
            placeholder="Image:"
            value={image}
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            placeholder="Description:"
            value={description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <section className="attribute1">
          <label htmlFor="attr1-input">
            <input
              type="text"
              id="attr1-input"
              placeholder="Attribute 1:"
              value={attr1Name}
              name="attr1Name"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="attr1-value-input">
            <input
              type="number"
              id="attr1-value-input"
              value={attr1Value}
              name="attr1Value"
              onChange={handleChange}
              disabled={!attr1Name}
              onKeyDown={onlyNumber}
              placeholder="10..."
            />
          </label>
        </section>
        <section className="attribute2">
          <label htmlFor="attr2-input">
            <input
              type="text"
              id="attr2-input"
              placeholder="Attribute 2:"
              value={attr2Name}
              name="attr2Name"
              onChange={handleChange}
              disabled={!attr1Name || !attr1Value}
            />
          </label>
          <label htmlFor="attr2-value-input">
            <input
              type="number"
              id="attr2-value-input"
              value={attr2Value}
              name="attr2Value"
              onChange={handleChange}
              disabled={!attr1Name || !attr1Value || !attr2Name}
              onKeyDown={onlyNumber}
              placeholder="10..."
            />
          </label>
        </section>
        <section className="attribute3">
          <label htmlFor="attr3-input">
            <input
              type="text"
              id="attr3-input"
              placeholder="Attribute 3:"
              value={attr3Name}
              name="attr3Name"
              onChange={handleChange}
              disabled={!attr1Name || !attr1Value || !attr2Name || !attr2Value}
            />
          </label>
          <label htmlFor="attr3-value-input">
            <input
              type="number"
              id="attr3-value-input"
              value={attr3Value}
              name="attr3Value"
              onChange={handleChange}
              disabled={
                !attr1Name ||
                !attr1Value ||
                !attr2Name ||
                !attr2Value ||
                !attr3Name
              }
              onKeyDown={onlyNumber}
              placeholder="10..."
            />
          </label>
        </section>
        {existTrunfo && isTrunfo(formData) && (
          <span className="alert">Já existe um card trunfo!</span>
        )}
        {existName && (
          <span className="alert">Já existe um card com este nome!</span>
        )}
        <button
          className="create-btn"
          onClick={onSubmit}
          disabled={savedDisabled()}
        >
          Create
        </button>
      </form>
      <section className="card-in-progress">
        <Card card={formData} />
      </section>
    </section>
  );
}

export default Form;
