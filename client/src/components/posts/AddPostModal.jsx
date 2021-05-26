import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../Contexts/PostContext";
import { AuthContext } from "../../Contexts/AuthContext";

const AddPostModal = () => {
  //Contexts

  const {
    showAddPostModal,
    setShowAddPostModal,
    setShowToast,
    addPost,
  } = useContext(PostContext);

  const {
    authState: {
      user: {
        username
      }
    }
  } = useContext(AuthContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "To learn",
  });

  const { title, description, url } = newPost;

  const onChangeInputForm = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "To learn",
    });
    setShowAddPostModal(false);
  };
  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await addPost(newPost);
      setShowToast({
        show: true,
        message: `Add task ${title} success! Happy learning my ${username} <3`
      })
      console.log(success + message);
      resetAddPostData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog} animation={false}>
      <Modal.Header>
        <Modal.Title>What do you wanna learn?</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              aria-describedby="title-help"
              value={title}
              onChange={onChangeInputForm}
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
              onChange={onChangeInputForm}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="link youtube tuts"
              name="url"
              value={url}
              onChange={onChangeInputForm}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Learn now!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
