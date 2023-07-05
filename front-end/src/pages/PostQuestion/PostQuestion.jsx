import { useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import {createQuestion, updateQuestiom} from "../../api/questions"
import { HOME_ROUTE} from "../../routes/const";


const PostQuestion = ({questiona}) => {
    const [title, setTitle] = useState(questiona?.title || "");
    const [question, setQuestion] = useState(questiona?.question || "");
    const isEditing = !!questiona;
  
    const navigate = useNavigate();
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      const submittingQuestion = {
        title,
        question
      };
  
      const saveQuestion = isEditing ? updateQuestiom : createQuestion;
      const savingQuestion = isEditing
        ? { id: questiona.id, ...submittingQuestion }
        : submittingQuestion;
  
      saveQuestion(savingQuestion)
        .then(() => {
          const route = isEditing
            ? generatePath(HOME_ROUTE, { id: question.id })
            : HOME_ROUTE;
          navigate(route);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

  return (
    <form onSubmit={onSubmitHandler}>
      <FormField
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        label="What is your question?"
        type="textarea"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <Button>Post Question</Button>
    </form>
  );
};

export default PostQuestion;


