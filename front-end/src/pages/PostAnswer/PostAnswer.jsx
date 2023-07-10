import { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import { createAnswer, updateAnswer } from "../../api/answers";
import { QUESTION_ROUTE } from "../../routes/const";
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
            <Button type="submit">{isEditing ? "Edit" : "Create"} Answer</Button> 
      </div>
 
    </form>
    </div>

  );
};

export default PostAnswer;
