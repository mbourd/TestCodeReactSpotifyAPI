import { useEffect, useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { services, store } from '../..';
import Pagination from "../Pagination/Pagination";
import SearchEngine from "../Forms/SearchEngine";
import Playlist from "../Playlists/Playlists";
import Album from "../Album/Album";
import { connect } from 'react-redux';
import qs from "qs"
import { environnement } from '../../config/environnement/environnement';

const MainPage = ({ global }) => {
  const [spotify_code] = useState(new URLSearchParams(window.location.search).get("code"));
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState({});
  const [items, setItems] = useState([]); // les items qui seront affichés
  const [listItems, setlistItems] = useState([]); // sauvegarde la liste entière des items
  const [display, setDisplay] = useState(""); // ce qu'il faut afficher
  const [paginationSize, setPaginationSize] = useState(3); // la taille de pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Récupère le token, puis remet les valeurs des states
  useEffect(() => {
    /** Remet les valeurs comme avant */
    if (global.hasOwnProperty("items")) {
      setItems(global.items)
    }
    if (global.hasOwnProperty("data")) {
      setData(global.data)
    }
    if (global.hasOwnProperty("display")) {
      setDisplay(global.display);
    }
    if (global.hasOwnProperty("currentPage")) {
      setCurrentPage(global.currentPage);
    }
    if (global.hasOwnProperty("listItems")) {
      setlistItems(global.listItems);
    }

    if (spotify_code) {
      sessionStorage.setItem("spotify_code", spotify_code);
    }

    if (!sessionStorage.hasOwnProperty("spotify_code") || !sessionStorage.getItem("spotify_code")) {
      services.spotify.redirectToAuthorize(environnement.clientId);
    } else {
      if (!sessionStorage.getItem("access_token")) {
        services.spotify
          .getAccessToken(
            environnement.clientId,
            environnement.clientSecret,
            sessionStorage.getItem("spotify_code"),
            environnement.redirectUri
          )
          .then((response) => {
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            setAccessToken(response.data.access_token);
          })
          .catch((error) => console.log(error));
      }
    }

    // eslint-disable-next-line
  }, []);

  // Met à jour la state global
  // Par exemple lors de la navigation vers la page de détail de l'album
  // Puis reviens sur MainPage
  useEffect(() => {
    store.dispatch({
      type: "REPLACE_GLOBAL", value:
      {
        items,
        listItems,
        display,
        currentPage,
        data,
      }
    })
  }, [items, listItems, display, currentPage, data])

  return (
    <>
      <Col></Col>
      <Col xs={6}>
        <Card>
          <Card.Header>
            <div>Test Code</div>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {/* Search Engine */}
              <SearchEngine
                setItems={setItems}
                setlistItems={setlistItems}
                setData={setData}
                setCurrentPage={setCurrentPage}
                paginationSize={paginationSize}
                setDisplay={setDisplay}
              />
            </Card.Title>
            <Row>
              {items.map((item, index) => {
                switch (display) {
                  case "playlists":
                    return <Col key={index}><Playlist playlist={item} /></Col>
                    break;
                  case "albums":
                    return <Col key={index}><Album album={item} /></Col>
                    break;

                  default:
                    return <></>
                    break;
                }
              })}
            </Row>
          </Card.Body>
          <Card.Footer>
            {/** Pagination */}
            <Pagination
              paginationSize={paginationSize}
              listItems={listItems}
              setlistItems={setlistItems}
              setItems={setItems}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              display={display}
            />
          </Card.Footer>
        </Card>
      </Col>
      <Col></Col>
    </>
  )
};

const mapStateToProps = (state) => {
  return { global: state.global }
}

export default connect(mapStateToProps)(MainPage);
