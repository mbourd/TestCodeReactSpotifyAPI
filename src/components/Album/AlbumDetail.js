import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useMatch } from "react-router";
import { useNavigate } from "react-router-dom";
import { services } from "../..";
import dayjs from "dayjs";

const AlbumDetail = ({ }) => {
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

  useEffect(() => {
    services.spotify
      .getAlbumInfo(match.params.id)
      .then((response) => {
        console.log(response.data)
        setAlbumData(response.data);
        setCurrentUrlImage(response.data.images[0].url)
      })
  }, []);

  const backMain = () => {
    navigateTo("/");
  }

  const playPreview = (track) => (event) => {
    let audio = new Audio(track.preview_url);
    currentAudio.pause();
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
                {albumData.tracks.items.map((track, index) => {
                  return <Col>
                    {track.name + " "} <Button onClick={playPreview(track)} variant="outline-primary">Preview</Button>
                  </Col>
                })}
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

export default AlbumDetail;
