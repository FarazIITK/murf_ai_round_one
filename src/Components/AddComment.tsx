import React from 'react';
import { useState } from 'react';

import { IComment } from '../App';

interface IProp {
  comments: IComment[];
  setComments: React.Dispatch<
    React.SetStateAction<IComment[]>
  >;
}

const AddComment = (props: IProp) => {
  console.log('We can commit a console');
  console.log('We can commit a console');
  console.log('We can commit a console');
  console.log('We can commit a console');
  console.log('We can commit a console');
  const [commentText, setCommentText] =
    useState<string>('');

  const handleCommentSubmit = () => {
    setCommentText('');
    props.setComments((prevComments) => {
      const newComment: IComment = {
        id: Math.floor(Math.random() * 10000000).toString(),
        commentText: commentText,
        childrens: []
      };
      return [...prevComments, newComment];
    });
  };

  const handleInputChange = (e: any) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="add-comment">
      <div className="comment-input">
        <div className="user-icon" />
        <input
          type="text"
          value={commentText}
          onChange={(e) => handleInputChange(e)}
          className="comment-input-bar"
        />
      </div>

      <button
        onClick={handleCommentSubmit}
        className="add-button"
      >
        Add new comment
      </button>
    </div>
  );
};

export default AddComment;
