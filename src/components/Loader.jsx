import { loader } from "../assets";

const Loader = () => {
  return (
    <div className="flex size-full items-center justify-center gap-3 text-lg">
      <img
        src={loader}
        alt="loader"
        width={50}
        height={50}
        className="animate-spin"
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
