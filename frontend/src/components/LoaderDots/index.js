import "./LoaderDots.css";

const LoaderDots = () => {
  return (
    <div className="dots-loading-container">
      <div className="dots-loading-wrapper">
        <div className="dots-circle"></div>
        <div className="dots-circle"></div>
        <div className="dots-circle"></div>
        <div className="dots-shadow"></div>
        <div className="dots-shadow"></div>
        <div className="dots-shadow"></div>
      </div>
    </div>
  );
};

export default LoaderDots;
