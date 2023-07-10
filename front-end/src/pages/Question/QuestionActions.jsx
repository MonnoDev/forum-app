import PropTypes from "prop-types";
import { useNavigate, generatePath } from "react-router-dom";
import { EDIT_QUESTION_ROUTE, HOME_ROUTE } from "../../routes/const";
import { deleteQuestion } from "../../api/questions";
import Button from "../../components/Button/Button";
import "./Question.css";

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
      <Button onClick={onEdit}>Edit question</Button>
      <Button onClick={onDelete}>Delete question</Button>
    </div>
  );
};

QuestionActions.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QuestionActions;

