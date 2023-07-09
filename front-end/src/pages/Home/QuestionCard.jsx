import "./Home.css";
import { formatDate } from "../../utils/date";

const QuestionCard = ({ question }) => {
  const { title, question: questionText, lastEdited, postedDate } = question;
  const formattedLastEdited = lastEdited ? formatDate(lastEdited) : null;

  return (
    <div className="container-question">
      <h2>Title: {title}</h2>
      <div>Question: {questionText}</div>
      <div>Posted date: {postedDate}</div>
      {formattedLastEdited && (
        <span className="edited">Edited on {formattedLastEdited}</span>
      )}
    </div>
  );
};

export default QuestionCard;
