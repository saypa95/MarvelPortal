import errorImg from './error.gif'

const ErrorMessage = () => {
  return (
    <img src={errorImg} alt="error" style={{ display: 'block', width: "180px", height: "180px",objectFit: 'contain', margin: "0 auto"}}/>
  );
};

export default ErrorMessage;