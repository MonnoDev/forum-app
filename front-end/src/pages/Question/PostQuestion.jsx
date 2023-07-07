import { useState } from 'react';
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import { createComment } from '../../api/comments';

const PostComment = ({ questionId }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComment(questionId, { comment });
      setComment('');
      window.location.reload();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <TextArea
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit">Submit Comment</Button>
    </form>
  );
};

export default PostComment;





