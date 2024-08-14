import { useEffect, useState } from "react";
import { copy, linkIcon, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import Loader from "./Loader";
import deleteIcon from "./../assets/delete.svg";

const Content = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

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
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    const timeout = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timeout);
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
                <button
                  className="action-btn"
                  onClick={() => handleCopy(item.url)}
                >
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy/tick-icon"
                    className="w-[24px] h-[24px] object-contain"
                  />
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(index)}
                >
                  <img
                    src={deleteIcon}
                    alt="delete-icon"
                    className="w-[24px] h-[24px] object-contain"
                  />
                </button>
              </div>
              <div
                className="flex-1 font-satoshi text-blue-700 font-medium truncate"
                onClick={() => setArticle(item)}
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
        ) : error ? (
          <p className="font-inter font-bold text-center">
            Something went wrong...
            <br />
            <span className="font-satoshi font-normal">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <div className="rounded-md bg-gray-100 p-4 text-justify">
                <h2 className="font-satoshi font-bold text-xl text-center mb-4">
                  Summarized <span className="blue-gradient">Article</span>
                </h2>
                <hr className="border-none h-[1px] bg-gray-700 w-3/4 mx-auto" />
                <p className="font-inter font-medium">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Content;
