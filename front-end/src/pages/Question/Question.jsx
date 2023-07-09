import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { getQuestion } from "../../api/questions";
import { getComments } from "../../api/comments";
import QuestionCard from "../Home/QuestionCard";
import QuestionActions from "./QuestionActions";
import AnswerCard from "../PostAnswer/AnswerCard";
import PostAnswer from "../PostAnswer/PostAnswer";

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

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

    getComments(id)
      .then((response) => {
        setComments(response);
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
      <QuestionActions id={id} />
      <QuestionCard question={question} />
      <div>
        <PostAnswer questionId={id} />
      </div>
      <div>
        {comments.map((comment) => (
          <AnswerCard key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Question;
