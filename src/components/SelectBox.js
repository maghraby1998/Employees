import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const SelectBox = (props) => {
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [selected, setSelected] = useState();
  const [copiedManager, setCopiedManagers] = useState([]);
  const options = props.options;
  // console.log(props.options)
  const optionMapped = options?.map((option, index) => {
    let optionCapitalized =
      option?.name?.slice(0, 1).toUpperCase() +
      option?.name?.slice(1, option?.name?.length).toLowerCase();
    return (
      <li
        onClick={() =>
          handleChange({
            id: option.id,
            name: option.name,
          }, option.name)
        }
        className={
          selected === option.name
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
    if (selected) {
      props.handleSelectChange(props.name, selected);
    }
  }, [selected]);  

  const selectOff =
    "z-20 bg-[#F6F6F6] flex flex-col rounded absolute w-full top-[30px] overflow-hidden hidden max-h-[150px] overflow-y-auto";
  const selectOn =
    "mt-1 border border-1 border-grey-400 z-20 bg-[#F6F6F6] flex flex-col rounded absolute w-full top-[30px] overflow-hidden max-h-[150px] overflow-y-auto";

  const handleSelect = () => {
    setSelectDisplay((prev) => !prev);
  };

  const handleChange = (value, copied) => {
    setSelected(value);
    setSelectDisplay(false);
    if (props.values) {
      setCopiedManagers( prev => {
        return [...prev, copied]
      })
    }
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
        <div
          onClick={handleSelect}
          className={props.inputBorderError ? borderError : borderNoError}
        >
          {!props.values ? (
            selected ? (
              selected.name.slice(0, 1).toUpperCase() +
              selected.name.slice(1, selected.name.length)
            ) : (
              <p className="text-[grey]/80">Select</p>
            )
          ) : props.values.length > 0 ? (
            copiedManager.map((value, index) => {
              return <p key={index}>{value}</p>;
            })
          ) : (
            <p className="text-[grey]/80">Select</p>
          )}
          <FontAwesomeIcon
            className="text-[grey] text-[16px] pr-[10px] "
            icon={faAngleDown}
          />
        </div>
        <ul className={selectDisplay ? selectOn : selectOff}>{optionMapped}</ul>
      </div>
    </div>
  );
};

export default SelectBox;
