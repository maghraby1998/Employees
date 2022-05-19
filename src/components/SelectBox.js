import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SelectBox = (props) => {
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [selected, setSelected] = useState();
  const options = props.options;
  const optionMapped = options.map((option, index) => {
    let optionCapitalized =
      option.slice(0, 1).toUpperCase() +
      option.slice(1, option.length).toLowerCase();
    return (
      <li
        onClick={() => handleChange(option)}
        className={
          selected === option
            ? "px-2 py-1 cursor-pointer bg-[#EEEEEE]"
            : "px-2 py-1 cursor-pointer hover:bg-[#EEEEEE]"
        }
        key={index}
      >
        {optionCapitalized}
      </li>
    );
  });

  useEffect(() => {
    props.handleSelectChange(props.name, selected);
  }, [selected]);

  const selectOff =
    "z-20 bg-[#F6F6F6] flex flex-col rounded absolute w-full top-[30px] overflow-hidden hidden max-h-[150px] overflow-y-auto";
  const selectOn =
    "mt-1 border border-1 border-grey-400 z-20 bg-[#F6F6F6] flex flex-col rounded absolute w-full top-[30px] overflow-hidden max-h-[150px] overflow-y-auto";

  const handleSelect = () => {
    setSelectDisplay((prev) => !prev);
  };

  const handleChange = (value) => {
    setSelected(value);
    setSelectDisplay(false);
  };

  const borderError =
    "flex items-center justify-between cursor-pointer form-input form-input-error h-full w-full block px-2 rounded select-none";
  const borderNoError = selectDisplay
    ? "border border-2 border-[#23aaeb] flex items-center justify-between cursor-pointer text-[13px] pr-[5px] pl-[15px] h-full w-full block px-2 rounded select-none"
    : "flex items-center justify-between cursor-pointer form-input h-full w-full block px-2 rounded select-none";

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="w-full relative h-[30px]">
        <input
          onClick={handleSelect}
          onBlur={() =>
            setTimeout(() => {
              setSelectDisplay(false);
            }, 100)
          }
          className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
        />
        <span
          onClick={handleSelect}
          className={props.inputBorderError ? borderError : borderNoError}
        >
          {selected ? (
            selected.slice(0, 1).toUpperCase() +
            selected.slice(1, selected.length)
          ) : (
            <p className="text-[grey]/80">Select</p>
          )}
          <FontAwesomeIcon
            className="text-[grey] text-[16px] pr-[10px] "
            icon={faAngleDown}
          />
        </span>
        <ul className={selectDisplay ? selectOn : selectOff}>{optionMapped}</ul>
      </div>
    </div>
  );
};

export default SelectBox;
