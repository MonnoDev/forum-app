import "./Home.css";
import { formatDate } from "../../utils/date";

const QuestionCard = ({ question }) => {
  const { title, question: questionText, lastEdited, postedDate } = question;
  const formattedLastEdited = lastEdited ? formatDate(lastEdited) : null;

  return (
    <div className="questionCardContainer">
      <h2 className="questionTitle">{title}</h2>
      <div className="questionText">Question: {questionText}</div>
      <div className="postedDate">Posted date: {postedDate}</div>
      {formattedLastEdited && (
        <span className="edited">Edited on {formattedLastEdited}</span>
      )}
    </div>
  );
};

export default QuestionCard;

