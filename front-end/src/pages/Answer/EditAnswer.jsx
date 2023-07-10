import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { getAnswer } from "../../api/answers";
import { QUESTION_ROUTE } from "../../routes/const";
import PostAnswer from "./PostAnswer";
import Loading from "../../components/Loading/Loading";

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
    return <div>Answer not found</div>;
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

EditAnswer.propTypes = {
  answerId: PropTypes.string.isRequired,
};

export default EditAnswer;

