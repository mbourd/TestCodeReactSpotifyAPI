import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Album = ({ album }) => {
  const navigateTo = useNavigate();
  const redirectToAlbumDetail = () => {
    navigateTo("/album/" + album.id);
  }

  return (
    <div>
      <Row>
        <Card>
          <Card.Img variant="top" src={album.images.length > 0 ? album.images[0].url : ""}></Card.Img>
          <Card.Body>
            {/* <Card.Title>{album.name} - <Link to={"./album/" + album.id}>detail</Link></Card.Title> */}
            <Card.Title>{album.name} - <a href="#" onClick={redirectToAlbumDetail}>detail</a></Card.Title>
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
