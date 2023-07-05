import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions";
import QuestionCard from "./QuestionCard";
import Button from "../../components/Button/Button";
import { POST_QUESTION_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import "./Home.css"

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getQuestions()
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>There are no questions yet.</div>;
  }
  
  return (
    <div>
      <div>
        <Link to={POST_QUESTION_ROUTE}>
          <Button>Post a question</Button>
        </Link>
      </div>
      <div>
        {questions.map((question) => (
          <Link key={question._id} to={generatePath(QUESTION_ROUTE, { id: question._id })}>
            <QuestionCard title={question.title} question={question.question}/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
