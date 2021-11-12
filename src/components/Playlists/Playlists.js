import { Card, Row } from 'react-bootstrap';

const Playlist = ({ playlist }) => {
  return (
    <div>
      <Row>
        <Card>
          <Card.Title>{playlist.name}</Card.Title>
        </Card>
      </Row>
    </div>
  )
}

export default Playlist;
