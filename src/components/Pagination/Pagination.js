import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { services } from "../..";
import { ContextMainPage } from "../MainPage/MainPage";

const Pagination = ({ }) => {
  const contextMainPageValue = useContext(ContextMainPage);

  useEffect(() => {
    // Reupdate les items a afficher quand le numéro de la page est modifié
    try {
      paginate(null, contextMainPageValue.currentPage);
    } catch (error) { }
  }, [contextMainPageValue.listItems, contextMainPageValue.currentPage]);

  // Méthode pour paginer précèdent ou suivant, ou directement sur la page choisie
  const paginate = (action = "next", pageNumber = 0) => {
    let increment = 0;

    if (action)
      increment = action === "next" ? 1 : -1;

    pageNumber = (pageNumber === 0 ? contextMainPageValue.currentPage : pageNumber) + increment

    contextMainPageValue.setCurrentPage(pageNumber);
    contextMainPageValue.setItems(contextMainPageValue.listItems.slice((pageNumber - 1) * contextMainPageValue.paginationSize, pageNumber * contextMainPageValue.paginationSize));
  }

  // Méthode pour récuprer la liste suivante (pour albums seulement)
  const getNextResultsAlbums = () => {
    try {
      let next = new URL(contextMainPageValue.data.albums.next);
      let searchParams = new URLSearchParams(next.search);

      services.spotify
        .searchAlbum(
          searchParams.get("query"),
          searchParams.get("market"),
          searchParams.get("offset"),
          searchParams.get("limit")
        )
        .then((response) => {
          contextMainPageValue.setData(response.data);
          contextMainPageValue.setlistItems([...contextMainPageValue.listItems, ...response.data.albums.items]);
        });
    } catch (error) { }
  }

  return (
    <>
      {contextMainPageValue.listItems.length > 0 && contextMainPageValue.currentPage > 1 &&
        <Button
          className="btn-primary"
          onClick={() => (paginate("prev"))}
        >{"<"}</Button>}
      &nbsp;
      {
        [...Array(Math.ceil(contextMainPageValue.listItems.length / contextMainPageValue.paginationSize)).keys()].map((v, i) => {
          return <Button
            key={i + 1}
            id={"buttonPagination" + (i + 1)}
            className={"buttonPagination " + (contextMainPageValue.currentPage - 1 == i ? "btn-success" : "")}
            variant="outline-secondary"
            onClick={(e) => { paginate(null, i + 1); }}
          >{(i + 1) + " "}</Button>
        })
      }
      &nbsp;
      {contextMainPageValue.listItems.length > 0 && contextMainPageValue.currentPage * contextMainPageValue.paginationSize < contextMainPageValue.listItems.length &&
        <Button
          className="btn-primary"
          onClick={() => (paginate("next"))}
        >{">"}</Button>
      }
      &nbsp;
      {contextMainPageValue.listItems.length > 0 && contextMainPageValue.display === "albums" &&
        <Button
          className="btn-primary"
          onClick={getNextResultsAlbums}
        >{"liste suivante"}</Button>}
    </>
  );
};

export default Pagination;
