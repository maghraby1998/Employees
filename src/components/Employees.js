import { useState, useEffect } from "react";
import Card from "./Card";
import "../css/Employee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { openForm, closeForm } from "../actions/formDisplayActions";
import { getUsers, getUser } from "../queries/queries";
import { useQuery } from "@apollo/client";
import FilteredUsers from "./FilteredUsers";
import DeleteConfirmation from "./DeleteConfirmation";
import Pagination from "./Pagination";

const Employees = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const { loading, error, data } = useQuery(getUsers, {
    variables: {
      page: currentPage,
      name: filter,
    },
  });

  const deleteWidnowStatu = useSelector((state) => state.deleteWindow);

  const dispatch = useDispatch();

  const formDisplay = useSelector((state) => state.formDisplay);

  const employees = useSelector((state) => state.employees);

  const handleAddBtn = (e) => {
    e.stopPropagation();
    dispatch(openForm());
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setFilter(value);
  };

  // if (loading) {
  //   return (
  //     <h1 className="flex flex-col items-center justify-center absolute top-0 left-0 h-screen w-full text-5xl font-bold bg-blue-400/50 text-white z-50">
  //       <FontAwesomeIcon
  //         className="animate-spin text-9xl mb-5"
  //         icon={faSpinner}
  //       />
  //       Loading...
  //     </h1>
  //   );
  // }

  return (
    <div className="employee-page">
      {/* search contianer & add button */}
      <div className="flex w-full mb-[49px]">
        {/* search container */}
        <div className="w-full flex items-center justify-start h-[30px] bg-white p-1">
          <label htmlFor="search" className="w-fit">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
          </label>
          <input
            id="search"
            onChange={handleChange}
            value={filter}
            className="w-full h-full outline-none text-[13px]"
            type="text"
            placeholder="Search"
          />
        </div>
        {/* add button */}
        <button
          onClick={handleAddBtn}
          className="h-[30px] bg-[#2764ac] rounded text-[13px] border-0 outline-0 text-white flex items-center justify-center w-[101px] add-btn ml-[12px]"
        >
          <FontAwesomeIcon className="plus-icon" icon={faPlus} />
          <span>Add new</span>
        </button>
      </div>
      <div className="grid gap-[45px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.company_users?.data.map((user, index) => {
          return <Card key={index} user={user} />;
        })}
      </div>
      {loading ? (
        <h1 className="text-xl font-semibold">Loading...</h1>
      ) : (
        <div className="mt-5 w-full flex items-center justify-center">
          <Pagination
            nums={data?.company_users?.paginatorInfo?.lastPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}

      {deleteWidnowStatu ? <DeleteConfirmation /> : ""}
      {formDisplay ? <Form /> : ""}
    </div>
  );
};

export default Employees;
