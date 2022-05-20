import React from 'react'

const Pagination = (props) => {
    let {nums} = props;
    return [...Array(nums)].map((elementInArray, index) => (
      <button
        key={index}
        onClick={() => props.setCurrentPage(index + 1)}
        className={
          props.currentPage === index + 1
            ? "pagination-span pagination-active"
            : "pagination-span"
        }
      >
        {index + 1}
      </button>
    ));
  };

export default Pagination;