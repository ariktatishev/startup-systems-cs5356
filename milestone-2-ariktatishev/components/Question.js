const Question = ({ question, onDelete, isInstructor }) => {
  // Function to format the date into a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <p>Question: {question.text}</p>
      <p>Submitted by: {question.name || 'Anonymous'}</p>
      <p>Submitted on: {formatDate(question.createdAt)}</p>
      {/* Show delete button only if the user is an instructor */}
      {isInstructor && (
        <button onClick={() => onDelete(question.id)}>Delete Question</button>
      )}
    </div>
  );
};

export default Question;
