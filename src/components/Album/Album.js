import { Card, Row } from "react-bootstrap";

const Album = ({ album }) => {

  return (
    <div>
      <Row>
        <Card>
          <Card.Img variant="top" src={album.images.length > 0 ? album.images[0].url : ""}></Card.Img>
          <Card.Body>
            <Card.Title>{album.name}</Card.Title>
            <Card.Text>
              Artiste : {album.artists.map((artist, i) => (artist.name + (album.artists.length < i ? ", " : "")))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default Album;
