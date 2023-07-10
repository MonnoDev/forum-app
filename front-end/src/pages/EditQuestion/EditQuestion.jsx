import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import Loading from "../../components/Loading/Loading";
import PostQuestion from "../PostQuestion/PostQuestion";

const EditQuestion = () => {
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
    return <div>Question not found</div>;
  }

  return <PostQuestion question={question} />;
};

EditQuestion.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditQuestion;
