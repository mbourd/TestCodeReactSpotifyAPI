import './App.css';
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import PublicRoutes from './config/route/PublicRoutes';
import logo from './spotify-logo.jpg';

const App = ({ props1 }) => {
  return (
    <div className="App">
      <header>
        <img
          id="spotify-logo"
          src={logo}
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
