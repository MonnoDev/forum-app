import { useState, useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { getComment } from "../../api/comments";
import PostAnswer from "./PostAnswer";
import Loading from "../../components/Loading/Loading";
import { QUESTION_ROUTE } from "../../routes/const";

const EditAnswer = () => {
  const { answerId } = useParams();
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getComment(answerId)
      .then((response) => {
        setComment(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [answerId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!comment) {
    return <div>Comment not found</div>;
  }

  const onCancelEdit = () => {
    const route = generatePath(QUESTION_ROUTE, { id: comment.questionId });
    navigate(route);
  };

  return (
    <PostAnswer
      questionId={comment.questionId}
      comment={comment}
      onCancelEdit={onCancelEdit}
    />
  );
};

export default EditAnswer;
