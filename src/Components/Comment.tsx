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

  // Deep search here

  const deleteButtonHandler = () => {
    props.setComments((prevComments) => {
      return prevComments.filter(
        (currComment) => currComment.id !== comment.id
      );
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
