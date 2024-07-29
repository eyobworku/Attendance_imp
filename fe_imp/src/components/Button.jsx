import "../css/Button.css";

const Button = ({ children, type, onClick, disabled, className, style }) => {
  return (
    <button
      style={style}
      disabled={disabled}
      className={className ? className : "btn"}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
