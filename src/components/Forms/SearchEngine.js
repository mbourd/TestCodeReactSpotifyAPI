import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const SearchEngine = ({
  setSearchKeyword,
  searchAlbum,
  getPlaylists,
  setItems }) => {
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
