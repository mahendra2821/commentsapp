import { useState } from 'react';
import { v4 } from 'uuid';
import CommentItem from '../CommentItem';
import './index.css';

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
];

const Comments = () => {
  const [nameInput, setNameInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const deleteComment = (commentId) => {
    setCommentsList((prevComments) =>
      prevComments.filter(({eachComment}) => (eachComment) !== commentId)
    );
  };

  const toggleIsLiked = (id) => {
    setCommentsList((prevComments) => prevComments.map((eachComment) =>
      id !== (eachComment.id) ?
     { ...eachComment, isLiked: !eachComment.isLiked } : eachComment
    ));
  };
  
  const renderCommentsList = () => {
    return commentsList.map(({ id, ...eachComment }) => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={toggleIsLiked}
        deleteComment={deleteComment}
      />
    ));
  };

  const onAddComment = (event) => {
    event.preventDefault();
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(
          Math.random() * initialContainerBackgroundClassNames.length
        )
      ]
    }`;
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    };
    setCommentsList((prevComments) => [...prevComments, newComment]);
    setNameInput('');
    setCommentInput('');
  };

  const onChangeCommentInput = (event) => {
    setCommentInput(event.target.value);
  };

  const onChangeNameInput = (event) => {
    setNameInput(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="comments-container">
        <h1 className="app-heading">Comments</h1>
        <div className="comments-inputs">
          <form className="form" onSubmit={onAddComment}>
            <p className="form-description">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="name-input"
              placeholder="Your Name"
              value={nameInput}
              onChange={onChangeNameInput}
            />
            <textarea
              placeholder="Your Comment"
              className="comment-input"
              value={commentInput}
              onChange={onChangeCommentInput}
              rows="6"
            />
            <button type="submit" className="add-button">
              Add Comment
            </button>
          </form>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="line" />
        <p className="heading">
          <span className="comments-count">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{renderCommentsList()}</ul>
      </div>
    </div>
  )
}

export default Comments;

