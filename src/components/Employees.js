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
import { openForm } from "../actions/formDisplayActions";
import { getUsers } from "../queries/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import FilteredUsers from "./FilteredUsers";
import DeleteConfirmation from "./DeleteConfirmation";
import Pagination from "./Pagination";
import setNumberOfEmployees from "../actions/setNumberOfEmployees";
import { getInputsDataAndUserInfo } from "../queries/queries";
import { setInputsData } from "../actions/inputsDataActions";
import {setFormLoading} from "../actions/isFormLoadingActions";

const Employees = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();


  const [getAllUsers, { loading, error, data }] = useLazyQuery(getUsers);

  const [
    executeInputsAndUserData,
    {
      data: inputs_and_user_data,
      error: inputs_and_user_data_error,
      loading: inputs_and_user_data_loading,
    },
  ] = useLazyQuery(getInputsDataAndUserInfo);

  useEffect(() => {
    setCurrentPage(1);
    getAllUsers({
      variables: {
        page: currentPage,
        name: filter,
      },
    });
  }, [filter]);

  useEffect(() => {
    getAllUsers({
      variables: {
        page: currentPage,
        name: filter,
      },
    });
  }, [currentPage]);

  const deleteWidnowStatu = useSelector((state) => state.deleteWindow);

  const formDisplay = useSelector((state) => state.formDisplay);


  const handleAddBtn = (e) => {
    e.stopPropagation();
    executeInputsAndUserData({
      variables: {
        getUserInfo: false,
      },
      onCompleted: (data) => {
        dispatch(openForm());
        dispatch(
          setInputsData({
            company_attendance_profiles: data.company_attendance_profiles,
            company_departments: data.company_departments,
            company_offices: data.company_offices,
            company_positions: data.company_positions,
            managers: data.managers,
            roles: data.roles,
          })
        );
      },
    });
    // dispatch(openForm());
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setFilter(value);
  };

  if (inputs_and_user_data_loading) {
    return (
      <h1 className="text-4xl fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center h-full w-full bg-blue-400/50 font-semibold flex flex-col items-center justify-center z-50 h-screen w-full bg-red-400">
        <FontAwesomeIcon
          className="text-7xl text-blue-500 animate-spin mb-3"
          icon={faSpinner}
        />
        <span className="text-white shadow-lg capitalize">Loading...</span>
      </h1>
    );
  }

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
        <div className="mt-10 w-full flex items-center justify-center">
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
