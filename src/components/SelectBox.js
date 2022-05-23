import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";

const SelectBox = (props) => {
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [selected, setSelected] = useState();
  const [copiedManager, setCopiedManagers] = useState([]);
  const options = props.options;
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
          })
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

  useEffect( () => {
    if (props.currentValue) {
      if (props.values) {
        setCopiedManagers(props.currentValue);
      } else {
        setSelected(props.currentValue);
      }
    }
  }, [props.currentValue])

  useEffect(() => {
    if (selected) {
      props.handleSelectChange(props.name, selected);
    }
  }, [selected]);

  const selectOff =
    "z-50 bg-[#F6F6F6] flex flex-col rounded absolute w-full bottom-0 overflow-hidden hidden max-h-[150px] overflow-y-auto -translate-y-full";
  const selectOn =
    "mt-1 border border-1 border-grey-400 z-50 bg-[#F6F6F6] flex flex-col rounded absolute w-full bottom-0 overflow-hidden max-h-[150px] overflow-y-auto translate-y-full";

  const handleSelect = () => {
    setSelectDisplay((prev) => !prev);
  };

  const handleChange = (value) => {
    setSelected(value);
    setSelectDisplay(false);
    if (props.values) {
      setCopiedManagers((prev) => {
        return [...prev, value];
      });
    }
  };

  const borderError =
    "relative text-clip flex items-center justify-between cursor-pointer form-input form-input-error min-h-full w-full block px-2 rounded select-none";

  const borderNoError = selectDisplay
    ? copiedManager.length > 0
      ? "relative text-clip border border-2 border-[#23aaeb] min-h-[30px] flex items-center w-full cursor-pointer text-[13px] pr-[5px] pl-[15px] block px-2 rounded select-none"
      : "relative text-clip border border-2 border-[#23aaeb] flex items-center min-h-[30px] w-full justify-between cursor-pointer text-[13px] pr-[5px] pl-[15px] block px-2 rounded select-none"
    : copiedManager.length > 0
    ? "relative text-clip cursor-pointer form-input min-h-[30px] flex items-center w-full block px-2 rounded select-none py-1"
    : "relative text-clip flex items-center justify-between cursor-pointer form-input min-h-[30px] w-full block px-2 rounded select-none py-1";

  const handleDeleteSelect = (value) => {
    setCopiedManagers((prev) => {
      return prev.filter((copiedManager) => {
        return copiedManager.id != value;
      });
    });
    props.deleteCopiedManager(value);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="w-full relative min-h-[30px]">
        <input
          onClick={handleSelect}
          onBlur={() =>
            setTimeout(() => {
              setSelectDisplay(false);
            }, 100)
          }
          className="min-h-full w-full absolute opacity-0 top-0 left-0 cursor-pointer z-10"
        />
        <div className={props.inputBorderError ? borderError : borderNoError}>
          {!props.values ? (
            selected ? (
              selected.name.slice(0, 1).toUpperCase() +
              selected.name.slice(1, selected.name.length)
            ) : (
              <p className="text-[grey]/80">Select</p>
            )
          ) : props.values.length > 0 ? (
            <div className="w-[95%] overflow-auto">
              {copiedManager.map((value, index) => {
                return (
                  <p
                    className="px-2 w-fit float-left bg-gray-200 rounded-sm flex items-center justify-between min-w-[60px] mr-2 my-1"
                    key={index}
                  >
                    <span className="truncate mr-1">{value.name}</span>
                    <FontAwesomeIcon
                      onClick={() => handleDeleteSelect(value.id)}
                      icon={faXmark}
                      className="hover:bg-gray-300 cursor-pointer text-red-400 z-30 px-1"
                    />
                  </p>
                );
              })}
            </div>
          ) : (
            <p className="text-[grey]/80">Select</p>
          )}
          <FontAwesomeIcon
            className="text-[grey] text-[16px] pr-[10px] absolute top-1/2 -translate-y-1/2 right-[5px]"
            icon={faAngleDown}
          />
        </div>
        <ul className={selectDisplay ? selectOn : selectOff}>{optionMapped}</ul>
      </div>
    </div>
  );
};

export default SelectBox;
