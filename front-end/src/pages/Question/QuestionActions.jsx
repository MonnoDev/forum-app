import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import { EDIT_QUESTION_ROUTE } from "../../routes/const";

const QuestionActions = ({ id }) => {
  const navigate = useNavigate();

  const onEdit = () => {
    const path = generatePath(EDIT_QUESTION_ROUTE, { id });
    navigate(path);
  };
  return (
    <div>
      <Button onClick={onEdit}>Edit Question</Button>
    </div>
  );
};

export default QuestionActions;
