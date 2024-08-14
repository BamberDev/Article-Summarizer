import Content from "./components/Content";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
        <Content />
      </div>
    </main>
  );
};

export default App;
