import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import { EDIT_ANSWER_ROUTE} from "../../routes/const";
import { deleteAnswer } from "../../api/answers";

const AnswersAction = ({ answer, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    const path = generatePath(EDIT_ANSWER_ROUTE, {
      id: answer._id,
      answerId: answer._id,
    });
    navigate(path);
  };

  const handleDelete = () => {
    deleteAnswer(answer._id)
      .then(() => {
        window.location.reload(); // Reload the page after deleting the answer
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={handleEdit}>Edit Answer</Button>
      <Button onClick={handleDelete}>Delete Answer</Button>
    </div>
  );
};

export default AnswersAction;
