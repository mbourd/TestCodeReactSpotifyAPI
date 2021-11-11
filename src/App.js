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
import MainPage from './components/MainPage/MainPage';
import PublicRoutes from './config/route/PublicRoutes';

const App = ({ props1 }) => {
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
          <PublicRoutes />
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
