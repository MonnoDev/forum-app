const Input = ({ className, minLength, maxLength, ...props }) => {
  return (
    <input
      className={`input ${className}`}
      minLength={minLength}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default Input;
