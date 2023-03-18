import React from 'react';
import { useState } from 'react';

import { IComment } from '../App';

interface IProp {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const AddComment = (props: IProp) => {
  const [commentText, setCommentText] = useState<string>('');

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
    <div>
      <input
        type="text"
        value={commentText}
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={handleCommentSubmit}>Add</button>
    </div>
  );
};

export default AddComment;
