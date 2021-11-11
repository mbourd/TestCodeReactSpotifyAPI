import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import { services } from "../..";

const AlbumDetail = ({ props }) => {
  const match = useMatch("/album/:id");
  const [albumData, setAlbumData] = useState({});

  useEffect(() => {
    services.spotify
      .getAlbumInfo(match.params.id)
      .then((response) => {
        console.log(response);
        setAlbumData(response.data)
      })
  }, []);

  return (
    <>
      <div>
        {match.params.id}
      </div>
    </>
  )
};

export default AlbumDetail;
