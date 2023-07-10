import { useState, useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { getAnswer } from "../../api/answers";
import PostAnswer from "./PostAnswer";
import Loading from "../../components/Loading/Loading";
import { QUESTION_ROUTE } from "../../routes/const";

const EditAnswer = () => {
  const { answerId } = useParams();
  const [answer, setanswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAnswer(answerId)
      .then((response) => {
        setanswer(response);
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

  if (!answer) {
    return <div>answer not found</div>;
  }

  const onCancelEdit = () => {
    const route = generatePath(QUESTION_ROUTE, { id: answer.questionId });
    navigate(route);
  };

  return (
    <PostAnswer
      questionId={answer.questionId}
      answer={answer}
      onCancelEdit={onCancelEdit}
    />
  );
};

export default EditAnswer;
