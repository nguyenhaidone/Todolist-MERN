import { React, useContext, useEffect } from "react";
import { PostContext } from "../Contexts/PostContext";
import { AuthContext } from "../Contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import addIcon from "../assets/plus-circle-fill.svg";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import Toast from "react-bootstrap/Toast";

const Dashboard = () => {
  //Context
  const {
    postState: { post, posts, postLoading },
    getAllPost,
    setShowAddPostModal,
    showToast: { show, message },
    setShowToast,
  } = useContext(PostContext);

  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  //Start: get all post
  useEffect(() => {
    getAllPost();
  }, []);

  let body = null;
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              Learn It
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        <Button
          className="btn-floating"
          onClick={setShowAddPostModal.bind(this, true)}
        >
          <img src={addIcon} alt="add post" width="60" height="60" />
        </Button>
      </>
    );
  }

  return (
    <div>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "10%", left: "38%" }}
        className={`bg-success text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Dashboard;
