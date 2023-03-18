import { IComment } from '../App';
import { useState } from 'react';
import Reply from './Reply';

interface IProp {
  comment: IComment;
  setComments: React.Dispatch<
    React.SetStateAction<IComment[]>
  >;
}

const Comment = (props: IProp) => {
  const { comment } = props;
  const [
    isDisplayReplyComponentVisible,
    setIsDisplayReplyComponentVisible
  ] = useState<boolean>(false);

  const replyButtonHandler = () => {
    setIsDisplayReplyComponentVisible(true);
  };

  const removeById = (
    prevComments: IComment[],
    targetId: string
  ) => {
    const arr: IComment[] = [...prevComments];

    const result: IComment[] = arr.reduce<IComment[]>(
      (acc, obj) => {
        return obj.id === targetId
          ? acc
          : [
              ...acc,
              {
                ...obj,
                ...(obj.childrens && {
                  childrens: removeById(
                    obj.childrens,
                    targetId
                  )
                })
              }
            ];
      },
      []
    );
    return result;
  };

  const deleteButtonHandler = () => {
    props.setComments((prevComments) => {
      return removeById(prevComments, comment.id);
    });
  };

  return (
    <div style={{ padding: '10px' }}>
      <h1>Comment: {comment.commentText}</h1>
      <button onClick={replyButtonHandler}>Reply</button>
      <button onClick={deleteButtonHandler}>Delete</button>
      {isDisplayReplyComponentVisible && (
        <Reply
          comment={comment}
          setComments={props.setComments}
          isDisplayReplyComponentVisible={
            isDisplayReplyComponentVisible
          }
          setIsDisplayReplyComponentVisible={
            setIsDisplayReplyComponentVisible
          }
        />
      )}
      {comment.childrens.map((currChild) => {
        return (
          <h3 style={{ padding: '30px' }}>
            <Comment
              key={currChild.id}
              comment={currChild}
              setComments={props.setComments}
            />
            {/* {currChild.commentText} */}
          </h3>
        );
      })}
    </div>
  );
};

export default Comment;
