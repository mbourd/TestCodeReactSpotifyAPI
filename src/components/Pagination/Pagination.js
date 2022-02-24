import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { services } from "../..";

const Pagination = ({
  paginationSize,
  listItems, // list de tout les items "albums"
  setlistItems,
  setItems, // list des albums a afficher
  data, // informations de l'album
  setData,
  currentPage,
  setCurrentPage,
  display, // afficher les albums ou playlists
}) => {
  useEffect(() => {
    // Reupdate les items a afficher quand le numéro de la page est modifié
    try {
      paginate(null, currentPage);
    } catch (error) { }
  }, [currentPage]);

  // Méthode pour paginer précèdent ou suivant, ou directement sur la page choisie
  const paginate = (action = "next", pageNumber = 0) => {
    let increment = 0;

    if (action)
      increment = action === "next" ? 1 : -1;

    pageNumber = (pageNumber === 0 ? currentPage : pageNumber) + increment

    setCurrentPage(pageNumber);
    setItems(listItems.slice((pageNumber - 1) * paginationSize, pageNumber * paginationSize));
  }

  // Méthode pour récuprer la liste suivante (pour albums seulement)
  const getNextResultsAlbums = () => {
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
          setlistItems([...listItems, ...response.data.albums.items]);
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
      {
        [...Array(Math.ceil(listItems.length / paginationSize)).keys()].map((v, i) => {
          return <Button
            key={i + 1}
            id={"buttonPagination" + (i + 1)}
            className={"buttonPagination " + (currentPage - 1 == i ? "btn-success" : "")}
            variant="outline-secondary"
            onClick={(e) => { paginate(null, i + 1); }}
          >{(i + 1) + " "}</Button>
        })
      }
      &nbsp;
      {listItems.length > 0 && currentPage * paginationSize < listItems.length &&
        <Button
          className="btn-primary"
          onClick={() => (paginate("next"))}
        >{">"}</Button>
      }
      &nbsp;
      {listItems.length > 0 && display === "albums" &&
        <Button
          className="btn-primary"
          onClick={getNextResultsAlbums}
        >{"liste suivante"}</Button>}
    </>
  );
};

export default Pagination;
