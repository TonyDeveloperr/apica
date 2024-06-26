import React, { useState } from "react";

interface Props {
  label: string;
  items: string[];
  placeholder: string;
  onSelect: (value: string) => void;
  style?: React.CSSProperties;
  id: string;
}

const Dropdown: React.FC<Props> = ({
  items,
  label,
  placeholder,
  onSelect,
  style,
  id,
}) => {
  return (
    <div style={style} className="dropdown">
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={(e) => onSelect(e.target.value)}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
        <option disabled hidden value="">
          {placeholder}
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
