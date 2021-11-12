import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { services } from "../..";

const Pagination = ({
  paginationSize,
  listItems,
  setlistItems,
  setItems,
  data,
  setData,
  currentPage,
  setCurrentPage
}) => {
  useEffect(() => {
    if (listItems.length === 0) {
      [].forEach.call(document.getElementsByClassName("buttonPagination"), (element) => {
        element.classList.remove("btn-success");
      });
    }
    try {
      document.getElementById("buttonPagination" + currentPage).classList.add("btn-success");
    } catch (error) { }
  }, [listItems, currentPage]);

  const paginate = (action = "next", pageNumber = 0) => {
    let increment = 0;

    if (action)
      increment = action === "next" ? 1 : -1;

    pageNumber = (pageNumber === 0 ? currentPage : pageNumber) + increment

    setCurrentPage(pageNumber);
    setItems(listItems.slice((pageNumber - 1) * paginationSize, pageNumber * paginationSize));

    [].forEach.call(document.getElementsByClassName("buttonPagination"), (element) => {
      element.classList.remove("btn-success");
    })

    document.getElementById("buttonPagination" + pageNumber).classList.add("btn-success");
  }

  const getNext = () => {
    try {
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
    } catch (error) { }
  }

  return (
    <>
      {listItems.length > 0 && currentPage > 1 &&
        <Button
          className="btn-primary"
          onClick={() => (paginate("prev"))}
        >{"<"}</Button>}
      &nbsp;
      {listItems.map((item, i) => {
        if ((i + 1) * paginationSize <= listItems.length + (paginationSize % 2 === 0 ? 0 : 2)) {
          return <Button
            key={i}
            id={"buttonPagination" + (i + 1)}
            className="buttonPagination"
            variant="outline-secondary"
            onClick={(e) => {
              paginate(null, i + 1);
            }}
          >{(i + 1) + " "}</Button>
        }

        return (<></>);
      })}
      &nbsp;
      {listItems.length > 0 && currentPage * paginationSize < listItems.length &&
        <Button
          className="btn-primary"
          onClick={() => (paginate("next"))}
        >{">"}</Button>
      }
      &nbsp;
      {listItems.length > 0 &&
        <Button
          className="btn-primary"
          onClick={getNext}
        >{"liste suivante"}</Button>}
    </>
  );
};

export default Pagination;
