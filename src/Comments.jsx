import { useState } from 'react';

const Comments = ({ comments, addComment, deleteComment }) => {
  const [activeInputId, setActiveInputId] = useState(-1);
  const [replyText, setReplyText] = useState('');

  const handleAddReply = (parentId) => {
    if (replyText) {
      addComment(parentId, replyText);
      setActiveInputId(-1);
    }
    setReplyText('');
  };

  const cancelReply = () => {
    setActiveInputId(-1);
    setReplyText('');
  };

  const handleKeyDown = (e, parentId) => {
    if (e.key === 'Enter') handleAddReply(parentId);
    else if (e.key === 'Escape') cancelReply();
  };

  return comments.map((comment) => (
    <div key={comment.id} style={{ marginLeft: '1rem' }}>
      <div>
        <p>{comment.text}</p>
        {activeInputId === comment.id && (
          <input
            type="text"
            placeholder="Reply..."
            autoFocus
            value={replyText}
            onKeyDown={(e) => handleKeyDown(e, comment.id)}
            onChange={(e) => setReplyText(e.target.value)}
          />
        )}
        {activeInputId === comment.id ? (
          <>
            <button onClick={() => handleAddReply(comment.id)}>Add</button>
            <button onClick={cancelReply}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setActiveInputId(comment.id)}>Reply</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </>
        )}
      </div>

      <div>
        <Comments
          comments={comment.replies}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  ));
};

export default Comments;
