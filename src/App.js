import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import { services } from '.';
import { Card, Col, Container, Row } from "react-bootstrap";
import Playlist from './components/Playlists/Playlists';
import Album from './components/Album/Album';
import SearchEngine from './components/Forms/SearchEngine';
import Pagination from './components/Pagination/Pagination';

const App = ({ props1 }) => {
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [listItems, setlistItems] = useState([]);
  const [display, setDisplay] = useState("playlists");
  const [searchKeyword, setSearchKeyword] = useState("lyric");
  const [paginationSize, setPaginationSize] = useState(3);

  useEffect(() => {
    services.spotify
      .getAccessToken("2fd2ef4d4cb14a0b8fb9e7d1546191d6", "f37c345ed51b40298b404728e775fc87")
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.access_token);
        setAccessToken(response.data.access_token);
      });
  }, []);

  const getPlaylists = () => {
    services.spotify
      .getMyPlaylists()
      .then((response) => {
        setData(response.data);
        setItems(response.data.items.slice(0, paginationSize));
        setlistItems(response.data.items);
        setDisplay("playlists");
      })
      .catch((error) => { console.log(error) });
  }

  const searchAlbum = () => {
    services.spotify
      .searchAlbum(searchKeyword)
      .then((response) => {
        setData(response.data);
        setItems(response.data.albums.items.slice(0, paginationSize));
        setlistItems(response.data.albums.items);
        setDisplay("albums");
      })
      .catch((error) => { console.log(error) });
  }

  return (
    <div className="App">
      <header>
        <img
          id="spotify-logo"
          src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
          alt="Spotify logo"
        />
      </header>
      <Container>
        <Row>
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
                    setSearchKeyword={setSearchKeyword}
                    searchAlbum={searchAlbum}
                    getPlaylists={getPlaylists}
                    setItems={setItems}
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
                        <></>
                        break;
                    }
                  })}
                </Row>
              </Card.Body>
              <Card.Footer>
                <Pagination
                  paginationSize={paginationSize}
                  listItems={listItems}
                  setItems={setItems}
                />
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <footer>
        Spotify
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { props1: "exemple value" }
};

export default connect(mapStateToProps)(App);
