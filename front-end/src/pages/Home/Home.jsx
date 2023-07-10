import { Link, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions";
import { POST_QUESTION_ROUTE, QUESTION_ROUTE } from "../../routes/const";
import QuestionCard from "./QuestionCard";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [filterType, setFilterType] = useState("all");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    getQuestions(sortOption, filterType)
      .then((response) => {
        setQuestions(response);
        setFilteredQuestions(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortOption, filterType]);

  useEffect(() => {
    filterQuestions();
  }, [filterType, questions]);

  const filterQuestions = () => {
    let filtered = [...questions];

    if (filterType === "answered") {
      filtered = filtered.filter((question) => question.answersCount > 0);
    } else if (filterType === "unanswered") {
      filtered = filtered.filter((question) => question.answersCount === 0);
    }

    if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    } else if (sortOption === "most_responses") {
      filtered.sort((a, b) => b.answersCount - a.answersCount);
    } else if (sortOption === "least_responses") {
      filtered.sort((a, b) => a.answersCount - b.answersCount);
    }

    setFilteredQuestions(filtered);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (questions.length === 0) {
    return (
      <div className="buttonContainer">
        <div>
          <Link to={POST_QUESTION_ROUTE}>
            <Button>Post a question</Button>
          </Link>
        </div>
        <div>
          Curiosity is the spark that ignites knowledge, and right now, it seems
          like the world is eagerly waiting for your questions to illuminate the
          path ahead.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="questionRouteContainer">
        <Link to={POST_QUESTION_ROUTE}>
          <Button>Post a question</Button>
        </Link>
      </div>
      <div>
        <div className="filterContainer">
          Filter:
          <select value={filterType} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="unanswered">Unanswered</option>
          </select>
        </div>
        <div className="sortContainer">
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most_responses">Most Responses</option>
            <option value="least_responses">Least Responses</option>
          </select>
        </div>
        {filteredQuestions.map((question) => (
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
