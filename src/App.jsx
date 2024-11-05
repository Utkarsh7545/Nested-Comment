import { useState } from 'react';
import Comments from './Comments';
import { v4 as uuidv4 } from 'uuid';

const initialComments = [
  {
    id: 1,
    text: "Hello world! How are you?",
    replies: [
      {
        id: 2,
        text: "Hey, I am fine, what about you?",
        replies: [],
      },
    ],
  },
];

const App = () => {
  const [newCommentText, setNewCommentText] = useState('');
  const [commentList, setCommentList] = useState(initialComments);

  const addComment = (parentId, text) => {
    if (!text) return;

    if (parentId === -1) {
      setCommentList((prevComments) => [
        { id: uuidv4(), text, replies: [] },
        ...prevComments,
      ]);
    } else {
      setCommentList((prevComments) => {
        const updatedComments = [...prevComments];
        addCommentToList(updatedComments, parentId, text);
        return updatedComments;
      });
    }
  };

  const deleteComment = (commentId) => {
    setCommentList((prevComments) => {
      const updatedComments = [...prevComments];
      deleteCommentFromList(updatedComments, commentId);
      return updatedComments;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addComment(-1, newCommentText);
      setNewCommentText('');
    }
    if (e.key === 'Escape') {
      setNewCommentText('');
    }
  };

  return (
    <>
      <h1>Comments</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Add comment..."
          onKeyDown={handleKeyDown}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />

        <button
          onClick={() => {
            addComment(-1, newCommentText);
            setNewCommentText('');
          }}
        >
          Add
        </button>
      </div>

      <Comments
        comments={commentList}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </>
  );
};

export default App;

const addCommentToList = (comments, parentId, text) => {
  for (const comment of comments) {
    if (comment.id === parentId) {
      comment.replies.unshift({
        id: uuidv4(),
        text,
        replies: [],
      });
      return true;
    }
    if (addCommentToList(comment.replies, parentId, text)) return true;
  }
  return false;
};

const deleteCommentFromList = (comments, commentId) => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      comments.splice(i, 1);
      return true;
    }
    if (deleteCommentFromList(comments[i].replies, commentId)) return true;
  }
  return false;
};
