import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { services } from "../..";

const Pagination = ({ paginationSize, listItems, setlistItems, setItems, data, setData }) => {
  useEffect(() => {
    if (listItems.length === 0) {
      [].forEach.call(document.getElementsByClassName("buttonPagination"), (element) => {
        element.classList.remove("btn-success");
      });
    }
    // else {
    //   document.getElementsByClassName("buttonPagination")[0].classList.add("btn-success");
    // }
  }, [listItems]);

  const [currentPage, setCurrentPage] = useState(0);

  const paginate = (action = "next", pageNumber = 0) => {
    let increment = action === "next" ? 1 : -1;

    setItems(listItems.slice((pageNumber - 1) * paginationSize, pageNumber * paginationSize));
  }

  const getNext = () => {
    let next = new URL(data.albums.next);
    let searchParams = new URLSearchParams(next.search);

    services.spotify
      .searchAlbum(
        searchParams.get("query"),
        searchParams.get("market"),
        searchParams.get("offset"),
        searchParams.get("limit")
      )
      .then((response) => {
        setData(response.data);
        setlistItems(listItems.concat(response.data.albums.items));
      });
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
      &nbsp;
      <Button
        className="btn-primary"
        onClick={getNext}
      >{">"}</Button>
    </>
  );
};

export default Pagination;
