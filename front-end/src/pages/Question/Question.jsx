import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import { getAnswers } from "../../api/answers";
import { HOME_ROUTE } from "../../routes/const";
import Loading from "../../components/Loading/Loading";
import QuestionCard from "../Home/QuestionCard";
import QuestionActions from "./QuestionActions";
import AnswerCard from "../Answer/AnswerCard";
import PostAnswer from "../Answer/PostAnswer";
import Button from "../../components/Button/Button";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setanswers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getQuestion(id)
      .then((response) => {
        setQuestion(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getAnswers(id)
      .then((response) => {
        setanswers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!question) {
    return <div>Question is not found</div>;
  }

  return (
    <div>
      <div className="questionButton">
        <Link to={HOME_ROUTE}>
          <Button>Back to questions</Button>
        </Link>
      </div>

      <div>
        <QuestionActions id={id} />
        <QuestionCard question={question} />
        <div>
          <PostAnswer questionId={id} />
        </div>
        <div>
          {answers.map((answer) => (
            <AnswerCard key={answer._id} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Question;

