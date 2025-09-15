import React, { useState } from "react";
import ItemList, { type Item } from "./components/ItemList";

export default function App() {
  const items: Item[] = [
    { id: 1, type: "restaurante", name: "La Casa del Sabor", description: "Comida típica ecuatoriana." },
    { id: 2, type: "hotel", name: "Hotel Andino", description: "Hotel 3 estrellas cerca del centro." },
    { id: 3, type: "paseo", name: "Tour Galápagos", description: "Excursión de 3 días por las islas." },
  ];

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSelect = (item: Item) => {
    alert(`Seleccionaste: ${item.name} (${item.type})`);
    setSelectedItem(item); // 👈 además guardamos el item seleccionado
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>App de Recomendaciones Turísticas</h1>

      {/* Lista */}
      <ItemList items={items} onSelect={handleSelect} />

      {/* Detalles debajo */}
      {selectedItem && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h2>Detalles del seleccionado</h2>
          <p><strong>Nombre:</strong> {selectedItem.name}</p>
          <p><strong>Tipo:</strong> {selectedItem.type}</p>
          <p><strong>Descripción:</strong> {selectedItem.description}</p>
        </div>
      )}
    </div>
  );
}
