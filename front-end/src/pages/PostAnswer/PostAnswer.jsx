import { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import { createComment, updateComment } from "../../api/comments";
import { QUESTION_ROUTE } from "../../routes/const";

const PostAnswer = ({ questionId, comment }) => {
  const [commentText, setCommentText] = useState(comment?.comment || "");
  const isEditing = !!comment;
  const navigate = useNavigate();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const submittingAnswer = {
      comment: commentText,
    };

    if (isEditing) {
      const updateAnswer = { id: comment._id, ...submittingAnswer };
      await updateComment(updateAnswer)
        .then(() => {
          const route = generatePath(QUESTION_ROUTE, { id: questionId });
          navigate(route);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await createComment(questionId, submittingAnswer)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <TextArea
        label="Comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />
      <Button type="submit">{isEditing ? "Edit" : "Create"} Comment</Button>
    </form>
  );
};

export default PostAnswer;
