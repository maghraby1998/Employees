import React, { useState, useEffect } from "react";
import { getUser } from "../queries/queries";
import { useQuery } from "@apollo/client";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ data, handeUpdatePage, page }) => {
  let nums = data.company_users.paginatorInfo.lastPage;
  return [...Array(nums)].map((elementInArray, index) => (
    <button
      key={index}
      onClick={() => handeUpdatePage(index + 1)}
      className={
        page === index + 1
          ? "pagination-span pagination-active"
          : "pagination-span"
      }
    >
      {index + 1}
    </button>
  ));
};

const FilteredUsers = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, loading } = useQuery(getUser, {
    variables: {
      name: props.filter,
      page: 1,
    },
  });

  if (loading) {
    return <h1 className="font-bold text-2xl">Searching...</h1>;
  }

  return (
    <div>
      {loading ? (
        ""
      ) : (
        <>
          <div className="grid gap-[45px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.company_users.data.map((user, index) => {
              return <Card key={index} user={user} />;
            })}
          </div>

          <div className="mt-5 w-full flex items-center justify-center">
            <Pagination
              data={data}
              handeUpdatePage={(val) => setCurrentPage(val)}
              page={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilteredUsers;
