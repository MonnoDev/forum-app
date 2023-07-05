const TextArea = ({ label, ...props }) => {
    return (
      <div>
        <div>
          <label>{label}:</label>
        </div>
        <textarea {...props}></textarea>
      </div>
    );
  };
  
  export default TextArea;
  