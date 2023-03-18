import React from 'react';
import { useState } from 'react';

import { IComment } from '../App';

interface IProp {
  comment: IComment;
  setComments: React.Dispatch<
    React.SetStateAction<IComment[]>
  >;
  isDisplayReplyComponentVisible: boolean;
  setIsDisplayReplyComponentVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Reply = (props: IProp) => {
  const [replyText, setReplyText] = useState<string>('');

  const handleInputChange = (e: any) => {
    setReplyText(e.target.value);
  };

  const handleCommentSubmit = () => {
    //
    setReplyText('');

    props.setComments((prevComments) => {
      // Create new reply
      const newReply: IComment = {
        id: Math.floor(Math.random() * 10000000).toString(),
        commentText: replyText,
        childrens: []
      };

      // Deep search here
      const targetComment = prevComments.find(
        (currComment) => currComment.id === props.comment.id
      );

      if (targetComment) {
        const updatedTargetComment = {
          ...targetComment,
          childrens: [...targetComment.childrens, newReply]
        };
        return prevComments.map((currComment) => {
          return currComment.id === updatedTargetComment.id
            ? updatedTargetComment
            : currComment;
        });
      }

      return [...prevComments];
    });
  };

  const handleCancelButton = () => {
    props.setIsDisplayReplyComponentVisible(false);
  };

  return (
    <div>
      <input
        type="text"
        value={replyText}
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={handleCommentSubmit}>Add</button>
      <button onClick={handleCancelButton}>Cancel</button>
    </div>
  );
};

export default Reply;
