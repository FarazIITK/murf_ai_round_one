import './App.css';
import { useState } from 'react';
import AddComment from './Components/AddComment';
import Comment from './Components/Comment';
import Header from './Components/Header';

export interface IComment {
  id: string;
  commentText: string;
  childrens: IComment[];
}

function App() {
  const [comments, setComments] = useState<IComment[]>([]);

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <AddComment
          comments={comments}
          setComments={setComments}
        />
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              setComments={setComments}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
