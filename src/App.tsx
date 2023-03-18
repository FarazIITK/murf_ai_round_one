import './App.css';
import { useEffect, useState } from 'react';
import AddComment from './Components/AddComment';
import Comment from './Components/Comment';

export interface IComment {
  id: string;
  commentText: string;
  childrens: IComment[];
}

function App() {
  const [comments, setComments] = useState<IComment[]>([]);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            setComments={setComments}
          />
        );
      })}
      <br />
      <br />
      <AddComment comments={comments} setComments={setComments} />
    </div>
  );
}

export default App;
