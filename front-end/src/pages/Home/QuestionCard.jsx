import "./Home.css"

const QuestionCard = ({title, question}) => {
  return (
    <div className="container-question">
        <h2>Title:{title}</h2>
        <div>Question:{question}</div>
    </div>
  )
}

export default QuestionCard