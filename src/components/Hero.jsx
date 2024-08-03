import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </nav>

      <h1 className="head_text">
        Summarize Articles with <span className="blue_gradient">AI</span>
      </h1>
      <h2 className="desc">
        Efficiently condenses articles into brief, clear summaries. It uses
        advanced algorithms for accurate, coherent results. Save time and boost
        productivity with this efficient text summarization tool.
      </h2>
    </header>
  );
};

export default Hero;
