import { useEffect, useState } from "react";
import { copy, linkIcon, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import Loader from "./Loader";
import deleteIcon from "./../assets/delete.svg";
import ActionButton from "./ActionButton";

const Content = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState({ url: "", summary: "" });
  const [currentError, setCurrentError] = useState(null);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      setCurrentError(null);
    } else {
      setCurrentError(
        error?.data?.error ||
          "An error occurred: Make sure you are trying to summarize a news article or another page with clearly defined blocks of text."
      );
    }
  };

  const handleArticleClick = (item) => {
    setCurrentError(null);
    setArticle(item);
  };

  const handleCopy = (type, content) => {
    setCopied({ ...copied, [type]: content });
    navigator.clipboard.writeText(content);
    setTimeout(() => setCopied({ ...copied, [type]: "" }), 3000);
  };

  const handleDelete = (index) => {
    const updatedAllArticles = allArticles.filter((_, i) => i !== index);
    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    if (article.url === allArticles[index].url) {
      setArticle({ url: "", summary: "" });
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url-input peer"
          />
          <button
            type="submit"
            className="submit-btn peer-focus:border-gray-700"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`item-${index}`} className="link-card">
              <div className="flex gap-2">
                <ActionButton
                  onClick={() => handleCopy("url", item.url)}
                  icon={copied.url === item.url ? tick : copy}
                />
                <ActionButton
                  onClick={() => handleDelete(index)}
                  icon={deleteIcon}
                />
              </div>
              <div
                className="flex-1 text-blue-700 font-medium truncate"
                onClick={() => handleArticleClick(item)}
              >
                <p>{item.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Loader />
        ) : currentError ? (
          <p className="font-bold text-center">
            Something went wrong...
            <br />
            <span className="font-normal">{currentError}</span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="rounded-md bg-gray-100 p-3 text-justify">
                <h2 className="font-bold text-xl text-center">
                  Summarized <span className="blue-gradient">Article</span>
                </h2>
                <hr className="border-none h-[1px] bg-black w-3/4 mx-auto my-3" />
                <p className="font-medium">{article.summary}</p>
                <div className="flex justify-center items-center mt-3">
                  <ActionButton
                    onClick={() => handleCopy("summary", article.summary)}
                    icon={copied.summary === article.summary ? tick : copy}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Content;
