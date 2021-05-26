import React from "react";
import Card from "react-bootstrap/Card";
import ActionButton from "./ActionButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SinglePost = ({ post: { _id, status, title, description, url } }) => (
  <Card
    className="shadow"
    border={
      status === "Learned"
        ? "success"
        : status === "Learning"
        ? "warning"
        : "danger"
    }
  >
    <Card.Body>
      <Card.Title>
        <Row>
          <Col>
            <p className="post-title">{title}</p>
            <Card.Subtitle className="mb-2 text-muted">{status}</Card.Subtitle>

            <Col className="text-right">
              <ActionButton url={url} _id={_id} />
            </Col>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default SinglePost;
