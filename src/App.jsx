import Content from "./components/Content";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Hero />
        <Content />
      </div>
    </main>
  );
};

export default App;
