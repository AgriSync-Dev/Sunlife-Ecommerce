import React, { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const InputComp = ({ value, type, placeholder, style, label, required = false, mainDivStyle, name, updateFormData, error, clearErrors ,onFocus }) => {

  const inputStyle = {
    width: '100%',
    padding: '8px 5px',
    borderRadius: '4px',
    border: error ? '1px solid red' : '1px solid black',
    ...style,
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateFormData(name, value);
  };
  const handleInputClick = () => {
    clearErrors();
  };
  return (
    <div style={mainDivStyle}>
      <div style={{ marginBottom: '2px', marginTop: '15px' }}>
        {label && <label>{label}{required ? '*' : ''}</label>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={onFocus}
        onChange={handleInputChange}
        onClick={handleInputClick} 
        required={required}
      />
      {error && (
        <div style={{ color: 'red', paddingTop: '5px', display: 'flex', alignItems: 'center' }}>
          <span className="d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BiErrorCircle />
          </span>
          <span style={{ fontSize: '14px', paddingLeft: '5px' }}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputComp;
