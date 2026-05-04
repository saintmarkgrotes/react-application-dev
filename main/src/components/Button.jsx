const Button = ({onclick, type = "button" }) => {
    return (
        <button 
            type={type}
            onClick={onclick}
        ></button>
  );
}

export default Button;