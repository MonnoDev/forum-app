import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { createQuestion, updateQuestion } from "../../api/questions";
import { QUESTION_ROUTE, HOME_ROUTE } from "../../routes/const";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import "../../style/FormStyle.css";

const PostQuestion = ({ question }) => {
  const [title, setTitle] = useState(question?.title || "");
  const [questionText, setQuestionText] = useState(question?.question || "");
  const isEditing = !!question;

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const submittingQuestion = {
      title,
      question: questionText,
    };

    if (isEditing) {
      const updatedQuestion = { id: question._id, ...submittingQuestion };
      updateQuestion(updatedQuestion)
        .then(() => {
          const route = generatePath(QUESTION_ROUTE, { id: question._id });
          navigate(route);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createQuestion(submittingQuestion)
        .then(() => {
          navigate(HOME_ROUTE);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="buttonConatiner">
        <Link to={HOME_ROUTE}>
          <Button>Back to questions</Button>
        </Link>
      </div>
      <div className="container">
        <form className="form" onSubmit={onSubmitHandler}>
          <FormField
            className="formField"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            className="textArea"
            label="What is your question?"
            type="textarea"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
          <Button className="button">
            {isEditing ? "Edit" : "Create"} Question
          </Button>
        </form>
      </div>
    </div>
  );
};

PostQuestion.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
    question: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default PostQuestion;
