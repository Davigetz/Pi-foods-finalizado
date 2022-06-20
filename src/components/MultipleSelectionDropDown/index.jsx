import React from "react";
import Mstyle from "./multiple.module.css";
function MultipleSelectDropDown({ options, selected, toggleOption }) {
  return (
    <div className={Mstyle.multi_select_dropdown}>
      <div className={Mstyle.multi_select_dropdown__selected}>
        <div>{selected.length}</div>
        <img alt="imagen incompleta" />
      </div>
      <ul className={Mstyle.multi_select_dropdown__options}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <li
              className={Mstyle.multi_select_dropdown__option}
              onClick={() => toggleOption({ id: option.id })}
            >
              <input
                type="checkbox"
                checked={isSelected}
                className={Mstyle.multi_select_dropdown__option_checkbox}
              />
              <span>{option.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MultipleSelectDropDown;
