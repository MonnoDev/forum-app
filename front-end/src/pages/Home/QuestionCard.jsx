import "./Home.css"

const QuestionCard = ({ question }) => {
  const { title, question: questionText, lastEdited } = question;
  return (
    <div className="container-question">
        <h2>Title:{title}</h2>
        <div>Question:{questionText}</div>
        {lastEdited && <span className="edited">Edited</span>}
    </div>
  )
}

export default QuestionCard