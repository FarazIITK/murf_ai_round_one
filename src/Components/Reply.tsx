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

  const findById = (
    prevComments: IComment[],
    targetId: string,
    newReply: IComment
  ) => {
    const arr: IComment[] = [...prevComments];

    const result: IComment[] = arr.reduce<IComment[]>(
      (acc, obj) => {
        return obj.id === targetId
          ? [
              ...acc,
              {
                ...obj,
                childrens: [...obj.childrens, newReply]
              }
            ]
          : [
              ...acc,
              {
                ...obj,
                ...(obj.childrens && {
                  childrens: findById(
                    obj.childrens,
                    targetId,
                    newReply
                  )
                })
              }
            ];
      },
      []
    );
    return result;
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
      const target: IComment[] = findById(
        prevComments,
        props.comment.id,
        newReply
      );

      return target;
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
