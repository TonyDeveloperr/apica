import React from "react";

interface Props {
  label: string;
  placeholder: string;
  longText: boolean;
  onChange: (value: string) => void;
  id: string;
}

const InputBox = ({ label, placeholder, longText, onChange, id }: Props) => {
  return (
    <div className="input-box">
      <label htmlFor={id}>{label}</label>
      {longText ? (
        <textarea
          className="long-text-input"
          id={id}
          placeholder={placeholder}
          rows={10}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      ) : (
        <input
          className="short-text-input"
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default InputBox;
