import { useEffect, useState } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { services, store } from '../..';
import Pagination from "../Pagination/Pagination";
import SearchEngine from "../Forms/SearchEngine";
import Playlist from "../Playlists/Playlists";
import Album from "../Album/Album";
import { connect } from 'react-redux';

const MainPage = ({ global }) => {
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState({});
  const [items, setItems] = useState([]); // les items qui seront affichés
  const [listItems, setlistItems] = useState([]); // sauvegarde la liste entière des items
  const [display, setDisplay] = useState("playlists"); // ce qu'il faut afficher
  const [paginationSize, setPaginationSize] = useState(3); // la taille de pagination
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    services.spotify
      .getAccessToken("2fd2ef4d4cb14a0b8fb9e7d1546191d6", "f37c345ed51b40298b404728e775fc87")
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("access_token", response.data.access_token);
        setAccessToken(response.data.access_token);
      });

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

    // eslint-disable-next-line
  }, []);

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
  }, [items,listItems, display, currentPage, data])

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
            <Pagination
              paginationSize={paginationSize}
              listItems={listItems}
              setlistItems={setlistItems}
              setItems={setItems}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
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
