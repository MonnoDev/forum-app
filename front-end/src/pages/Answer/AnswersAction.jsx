import PropTypes from "prop-types";
import { useNavigate, generatePath } from "react-router-dom";
import { EDIT_ANSWER_ROUTE } from "../../routes/const";
import { deleteAnswer } from "../../api/answers";
import Button from "../../components/Button/Button";

const AnswersAction = ({ answer }) => {
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
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={handleEdit}>Edit answer</Button>
      <Button onClick={handleDelete}>Delete answer</Button>
    </div>
  );
};

AnswersAction.propTypes = {
  answer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnswersAction;

