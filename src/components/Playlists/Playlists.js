import { useEffect, useState } from 'react';
import { Card, Row } from 'react-bootstrap';

const Playlist = ({ playlist }) => {
  const [id, setId] = useState(playlist.id);

  // useEffect(() => {
  //   console.log(data)
  // }, []);

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
