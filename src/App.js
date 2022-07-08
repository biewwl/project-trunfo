import "./App.css";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import Form from "./components/Form";
import CardsProvider from "./context/CardsContext";

function App() {
  return (
    <CardsProvider>
      <div className="App">
        <Form />
        <Filters />
        <Cards />
      </div>
    </CardsProvider>
  );
}

export default App;
