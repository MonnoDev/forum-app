import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { getQuestion } from "../../api/questions";
import { POST_QUESTION_ROUTE } from "../../routes/const";
import QuestionCard from "../Home/QuestionCard";
import Button from "../../components/Button/Button";
import QuestionActions from "./QuestionActions";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!question) {
    return <div>Question is not found</div>;
  }

  return (
    <div>
        <QuestionActions id={question.id} />
        <QuestionCard title={question.title} question={question.question} />
    </div>
  );
};

export default Question;
