import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import { EDIT_ANSWER_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import { deleteComment } from "../../api/comments";

const AnswersAction = ({ comment, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    const path = generatePath(EDIT_ANSWER_ROUTE, { id: comment._id, answerId: comment._id });
    navigate(path);
  };

  const handleDelete = () => {
    deleteComment(comment._id)
      .then(() => {
        window.location.reload(); // Reload the page after deleting the comment
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={handleEdit}>Edit Comment</Button>
      <Button onClick={handleDelete}>Delete Comment</Button>
    </div>
  );
};

export default AnswersAction;








