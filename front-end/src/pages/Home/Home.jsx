import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions";
import QuestionCard from "./QuestionCard";
import Button from "../../components/Button/Button";
import { POST_QUESTION_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import "./Home.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    getQuestions(sortOrder)
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

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
        <div>
          Sort by:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        {questions.map((question) => (
          <Link
            key={question.id}
            to={generatePath(QUESTION_ROUTE, { id: question.id })}
          >
            <QuestionCard question={question} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
