import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../Contexts/PostContext";

const UpdatePostModal = () => {
  //Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    setShowToast,
    updatePost,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    // console.log(post);
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
              required
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              value={description}
              placeholder="Desc"
              name="description"
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="link youtube tuts"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="To learn">To Learn</option>
              <option value="Learning">Learning</option>
              <option value="Learned">Learned</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn now!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
