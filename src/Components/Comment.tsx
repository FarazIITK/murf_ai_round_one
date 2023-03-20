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
    <div className="comment">
      <div className="comment-parent">
        <div className="comment-icon">
          <div className="user-icon" />
        </div>
        <div className="comment-content">
          <div className="comment-text">
            <h1>{comment.commentText}</h1>
          </div>
          <div className="paired-buttons">
            <button onClick={replyButtonHandler}>
              Reply
            </button>
            <button onClick={deleteButtonHandler}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="comment-reply">
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
      </div>

      {comment.childrens.map((currChild) => {
        return (
          <div style={{ paddingLeft: '70px' }}>
            <Comment
              key={currChild.id}
              comment={currChild}
              setComments={props.setComments}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
