import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { createAnswer, updateAnswer } from "../../api/answers";
import { QUESTION_ROUTE } from "../../routes/const";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import "./Answer.css";

const PostAnswer = ({ questionId, answer }) => {
  const [answerText, setanswerText] = useState(answer?.answer || "");
  const isEditing = !!answer;
  const navigate = useNavigate();

  const handleanswerSubmit = async (e) => {
    e.preventDefault();

    const submittingAnswer = {
      answer: answerText,
    };

    if (isEditing) {
      const modifyAnswer = { id: answer._id, ...submittingAnswer };
      await updateAnswer(modifyAnswer)
        .then(() => {
          const route = generatePath(QUESTION_ROUTE, { id: questionId });
          navigate(route);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await createAnswer(questionId, submittingAnswer)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="answerPostContainer">
      <form onSubmit={handleanswerSubmit}>
        <TextArea
          label="Answer"
          value={answerText}
          onChange={(e) => setanswerText(e.target.value)}
          required
        />
        <div className="answerPostContainerButton">
          <Button type="submit">{isEditing ? "Edit" : "Create"} answer</Button>
        </div>
      </form>
    </div>
  );
};

PostAnswer.propTypes = {
  questionId: PropTypes.string.isRequired,
  answer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }),
};

export default PostAnswer;

