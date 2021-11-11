import { useState } from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ paginationSize, listItems, setItems }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (action = "next", pageNumber = 0) => {
    let increment = action === "next" ? 1 : -1;

    setItems(listItems.slice((pageNumber - 1) * paginationSize, pageNumber * paginationSize));
  }

  return (
    <>
      {listItems.map((item, i) => {
        if ((i + 1) * paginationSize <= listItems.length + (paginationSize % 2 === 0 ? 0 : 1)) {
          return <Button
            key={i}
            className="buttonPagination"
            variant="outline-secondary"
            onClick={(e) => {
              [].forEach.call(document.getElementsByClassName("buttonPagination"), (element) => {
                element.classList.remove("btn-success");
              })
              e.target.classList.remove("outline-secondary");
              e.target.classList.add("btn-success");
              paginate(null, i + 1);
            }}
          >{(i + 1) + " "}</Button>
        }
      })}
    </>
  );
};

export default Pagination;
