"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dynamicform2({ onAdd }) {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  function add() {
    const v = value.trim();
    if (!v) return;
    const updated = [...items, v];
    setItems(updated);
    setValue("");

    if (onAdd) onAdd(v);   // send single item upward
  }

  function remove(i) {
    const updated = items.filter((_, idx) => idx !== i);
    setItems(updated);
    // If you want to sync removal to parent, also call:
    // onAdd(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Co-Coordinator Name"
        />
        <Button type="button" onClick={add}>Add</Button>
      </div>

      <ul className="list-disc pl-4">
        {items.map((x, i) => (
          <li key={i} className="flex justify-between w-full">
            {x}
            <button
              type="button"
              className="text-red-500 text-sm"
              onClick={() => remove(i)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
