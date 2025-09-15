import React from "react";

export type Item = {
  id: number;
  type: "restaurante" | "hotel" | "paseo";
  name: string;
  description: string;
};

type ItemListProps = {
  items: Item[];
  onSelect: (item: Item) => void;
};

export default function ItemList({ items, onSelect }: ItemListProps) {
  return (
    <div>
      <h2>Lista de Recomendaciones</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> ({item.type})<br />
            <small>{item.description}</small>
            <br />
            <button onClick={() => onSelect(item)}>Ver detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
