import { loader } from "../assets";

const Loader = () => {
  return (
    <div className="loader">
      <img
        src={loader}
        alt="loader"
        width={40}
        height={40}
        className="animate-spin"
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
