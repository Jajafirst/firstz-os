import { Routes, Route } from "react-router-dom";
import Items from "../src/components/Items";
import ItemDetail from "./components/ItemDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/items/:id" element={<ItemDetail />} />
    </Routes>
  );
}

export default App;