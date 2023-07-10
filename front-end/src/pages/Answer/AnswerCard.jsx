import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { SlDislike, SlLike } from "react-icons/sl";
import { formatDate } from "../../utils/date";
import AnswersAction from "./AnswersAction";
import EditAnswer from "./EditAnswer";
import "./Answer.css";

const AnswerCard = ({ answer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const storedLikeCount = localStorage.getItem(`like_${answer._id}`);
    const storedDislikeCount = localStorage.getItem(`dislike_${answer._id}`);
    const storedIsLiked = localStorage.getItem(`isLiked_${answer._id}`);
    const storedIsDisliked = localStorage.getItem(`isDisliked_${answer._id}`);

    setLikeCount(parseInt(storedLikeCount) || 0);
    setDislikeCount(parseInt(storedDislikeCount) || 0);
    setIsLiked(storedIsLiked === "true");
    setIsDisliked(storedIsDisliked === "true");
  }, [answer._id]);

  useEffect(() => {
    localStorage.setItem(`like_${answer._id}`, likeCount.toString());
    localStorage.setItem(`dislike_${answer._id}`, dislikeCount.toString());
    localStorage.setItem(`isLiked_${answer._id}`, isLiked.toString());
    localStorage.setItem(`isDisliked_${answer._id}`, isDisliked.toString());
  }, [answer._id, likeCount, dislikeCount, isLiked, isDisliked]);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);

      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };

  const formattedLastEdited = answer.lastEdited
    ? formatDate(answer.lastEdited)
    : null;

  return (
    <div className="answerPostContainer">
      <div className="answerPostReactions">
        <SlLike onClick={handleLike} className={isLiked ? "active" : ""} />
        <span>{likeCount}</span>
        <SlDislike
          onClick={handleDislike}
          className={isDisliked ? "active" : ""}
        />
        <span>{dislikeCount}</span>
      </div>
      <div className="answerPost">
        Answer: {answer.answer}
        <div className="edited">
          {formattedLastEdited && <span>Edited on {formattedLastEdited}</span>}
        </div>
        <div className="answerButtonContainer">
          {!isEditing && <AnswersAction answer={answer} />}
          {isEditing && <EditAnswer answer={answer} />}
        </div>
      </div>
    </div>
  );
};

AnswerCard.propTypes = {
  answer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    lastEdited: PropTypes.string,
  }).isRequired,
};

export default AnswerCard;
