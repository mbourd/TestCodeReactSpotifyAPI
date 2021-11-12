import { useEffect, useState } from "react";
import { Card, Row, Col, Button, ListGroup } from "react-bootstrap";
import { useMatch } from "react-router";
import { useNavigate } from "react-router-dom";
import { services } from "../..";
import dayjs from "dayjs";
import { connect } from "react-redux";

const AlbumDetail = ({ global }) => {
  const navigateTo = useNavigate();
  const match = useMatch("/album/:id");
  const [currentAudio, setCurrentAudio] = useState(new Audio());
  const [albumData, setAlbumData] = useState(
    // on peut aussi le mettre sous form de class model / entité
    {
      external_urls: { spotify: "" },
      artists: [{ name: "" }],
      release_date: "",
      popularity: 0,
      total_tracks: 0,
      tracks: { items: [] },
    }
  );
  const [currentUrlImage, setCurrentUrlImage] = useState("");

  // Récupère les informations de l'album, lorsque le component a été monté
  useEffect(() => {
    services.spotify
      .getAlbumInfo(match.params.id)
      .then((response) => {
        console.log(response.data)
        setAlbumData(response.data);
        setCurrentUrlImage(response.data.images[0].url)
      })

    // eslint-disable-next-line
  }, []);

  // Methode pour revenir sur la page principate
  const backMain = () => {
    navigateTo("/");
  }

  // Méthode pour ecouter un apercu de la musique
  const playPreview = (track) => (event) => {
    let audio = new Audio(track.preview_url);

    /** Stop la musique en cours */
    currentAudio.pause();
    currentAudio.currentTime = 0; // Remet la position à 0

    /** Joue la nouvelle musique */
    setCurrentAudio(audio);
    audio.play();
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col lg="6">
          <Card>
            <Card.Img
              variant="top"
              src={currentUrlImage}></Card.Img>
            <Card.Header>
              {albumData.name + " "}
              <a href={albumData.external_urls.spotify}>Ecouter</a>
            </Card.Header>
            <Card.Body>
              <Card.Text>Artist : {albumData.artists[0].name}</Card.Text>
              <Card.Text>Date de sortie : {dayjs(albumData.release_date).format("DD/MM/YYYY")}</Card.Text>
              <Card.Text>Popularité : {albumData.popularity}/100</Card.Text>
              <Card.Text>Total chanson : {albumData.total_tracks}</Card.Text>
              <Row>
                <ListGroup variant="flush">
                  {albumData.tracks.items.map((track, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col>{track.name + " "}</Col>
                          <Col><Button onClick={playPreview(track)} variant="outline-primary" disabled={!track.preview_url}>Preview</Button></Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Button
                onClick={backMain}
              >Retour</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </>
  )
};


const mapStateToProps = (state) => {
  return {global : state.global }
}

export default connect(mapStateToProps)(AlbumDetail);
