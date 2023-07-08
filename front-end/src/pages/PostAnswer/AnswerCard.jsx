import "./AnswerCard.css";
import { useState } from "react";
import AnswersAction from "./AnswersAction";
import EditAnswer from "./EditAnswer";

const AnswerCard = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(comment.isNew); // Track if the comment is new

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    // Implement the update functionality or any other logic you need
    // This function will be passed to AnswersAction
  };

  return (
    <div>
      <div className={`answerContainer ${isNew ? "new" : ""}`}>
        Comment: {comment.comment}
        <div className="edited">
        {comment.lastEdited && <span>Edited</span>}
        <div/>
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
    </div>
  );
};

export default AnswerCard;
