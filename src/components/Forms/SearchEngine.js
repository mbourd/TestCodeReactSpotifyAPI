import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { services } from "../..";
import { useState } from "react";

const SearchEngine = ({
  setItems,
  setlistItems,
  setData,
  setDisplay,
  setCurrentPage,
  paginationSize,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("lyric"); // le mot clé a rechercher

  const getPlaylists = () => {
    services.spotify
      .getMyPlaylists()
      .then((response) => {
        setData(response.data);
        setItems(response.data.items.slice(0, paginationSize));
        setlistItems(response.data.items);
        setDisplay("playlists");
        setCurrentPage(1);
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
        setCurrentPage(1);
      })
      .catch((error) => { console.log(error) });
  }

  return (
    <>
      <Formik
        initialValues={{
          keyword: ""
        }}
        validationSchema={() => Yup.object().shape({
          keyword: Yup.string().required("Veuillez saisir un mot clé")
        })}
        onSubmit={async (values) => {
          setItems([]);
          setlistItems([]);
          searchAlbum();
        }}
      >
        {({ errors, touched, values, handleSubmit, handleChange, setFieldValue }) => (
          <Form>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Search albums</Form.Label>
                <Form.Control
                  name="keyword"
                  type="text"
                  placeholder="lyrics"
                  onChange={(e) => {
                    setFieldValue("keyword", e.target.value);
                    setSearchKeyword(e.target.value);
                  }}
                  value={values.keyword}
                  isInvalid={touched.keyword && !!errors.keyword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.keyword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-info"
                  onClick={() => {
                    getPlaylists()
                  }}
                >Get all playlists</Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  variant="outline-info"
                  onClick={handleSubmit}
                >Search albums</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchEngine;
