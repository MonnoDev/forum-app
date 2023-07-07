import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { getQuestion } from "../../api/questions";
import { getComment } from "../../api/comments";
import QuestionCard from "../Home/QuestionCard";
import QuestionActions from "./QuestionActions";
import PostQuestion from "./PostQuestion";
import CommentsCard from "./CommentsCard";

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

    getComment(id)
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
      <QuestionActions id={question.id} />
      <QuestionCard title={question.title} question={question.question} />
      <div>
        <PostQuestion questionId={question.id} />
      </div>
      <div>
        {comments.map((comment) => (
          <CommentsCard key={comment._id} comment={comment.comment} />
        ))}
      </div>
    </div>
  );
};

export default Question;
