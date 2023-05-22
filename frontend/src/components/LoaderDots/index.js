import "./LoaderDots.css";

const LoaderDots = () => {
  return (
    <div className="dots-loading-container">
      <div class="dots-loading-wrapper">
        <div class="dots-circle"></div>
        <div class="dots-circle"></div>
        <div class="dots-circle"></div>
        <div class="dots-shadow"></div>
        <div class="dots-shadow"></div>
        <div class="dots-shadow"></div>
      </div>
    </div>
  );
};

export default LoaderDots;
