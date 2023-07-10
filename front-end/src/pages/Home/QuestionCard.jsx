import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import "./Home.css";

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

QuestionCard.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    lastEdited: PropTypes.instanceOf(Date),
    postedDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default QuestionCard;

