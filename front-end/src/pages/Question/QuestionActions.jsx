import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import { EDIT_QUESTION_ROUTE, HOME_ROUTE } from "../../routes/const";
import { deleteQuestion } from "../../api/questions";
import "./Question.css"

const QuestionActions = ({ id }) => {
  const navigate = useNavigate();

  const onEdit = () => {
    const path = generatePath(EDIT_QUESTION_ROUTE, { id });
    navigate(path);
  };

  const onDelete = () => {
    deleteQuestion(id)
      .then(() => {
        navigate(HOME_ROUTE);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="questionButtons">
      <Button onClick={onEdit}>Edit Question</Button>
      <Button onClick={onDelete}>Delete Question</Button>
    </div>
  );
};

export default QuestionActions;
