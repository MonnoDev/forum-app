import "./AnswerCard.css";
import { useState, useEffect } from "react";
import AnswersAction from "./AnswersAction";
import EditAnswer from "./EditAnswer";
import { SlDislike, SlLike } from "react-icons/sl";

const AnswerCard = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(comment.isNew); // Track if the comment is new
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    // Retrieve like/dislike data from local storage on component mount
    const storedLikeCount = localStorage.getItem(`like_${comment._id}`);
    const storedDislikeCount = localStorage.getItem(`dislike_${comment._id}`);
    const storedIsLiked = localStorage.getItem(`isLiked_${comment._id}`);
    const storedIsDisliked = localStorage.getItem(`isDisliked_${comment._id}`);

    setLikeCount(parseInt(storedLikeCount) || 0);
    setDislikeCount(parseInt(storedDislikeCount) || 0);
    setIsLiked(storedIsLiked === "true");
    setIsDisliked(storedIsDisliked === "true");
  }, [comment._id]);

  useEffect(() => {
    // Save like/dislike data to local storage on state change
    localStorage.setItem(`like_${comment._id}`, likeCount.toString());
    localStorage.setItem(`dislike_${comment._id}`, dislikeCount.toString());
    localStorage.setItem(`isLiked_${comment._id}`, isLiked.toString());
    localStorage.setItem(`isDisliked_${comment._id}`, isDisliked.toString());
  }, [comment._id, likeCount, dislikeCount, isLiked, isDisliked]);

  const handleLike = () => {
    if (isLiked) {
      // User unliked the comment
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      // User liked the comment
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      if (isDisliked) {
        // User un-disliked the comment if it was previously disliked
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      // User un-disliked the comment
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
    } else {
      // User disliked the comment
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);

      if (isLiked) {
        // User unliked the comment if it was previously liked
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Implement logic for handling edit
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Implement logic for handling cancel edit
  };

  const handleUpdate = () => {
    // Implement logic for handling update
  };

  return (
    <div>
      <div>
        <SlDislike
          onClick={handleDislike}
          className={isDisliked ? "active" : ""}
        />
        <span>{dislikeCount}</span>
        <SlLike onClick={handleLike} className={isLiked ? "active" : ""} />
        <span>{likeCount}</span>
      </div>
      <div className={`answerContainer ${isNew ? "new" : ""}`}>
        Comment: {comment.comment}
        <div className="edited">
          {comment.lastEdited && <span>Edited</span>}
        </div>
        {!isEditing && (
          <AnswersAction
            comment={comment}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
          />
        )}
        {isEditing && (
          <EditAnswer
            comment={comment}
            onCancelEdit={handleCancelEdit}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AnswerCard;
