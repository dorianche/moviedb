import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useQuery } from "react-query";
import MovieItem from "./components/MovieItem";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getMovies = async () => {
    const res = await axios({
      method: "get",
      url: `http://www.omdbapi.com/?apikey=${
        import.meta.env.VITE_DB
      }&s=${search}&page=${page}`,
    });
    console.log(res);
    if (!res.data.Error) {
      return res;
    } else {
      return "Search resulted in an error.";
    }
  };

  const { data, status, refetch, isLoading } = useQuery("movies", getMovies, {
    enabled: false,
  });

  const handleClick = () => {
    refetch();
    setPage(1);
  };

  return (
    <div className="App">
      <h1>Search Movie Database</h1>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Movie"
          onChange={handleChange}
        />
        <button onClick={handleClick}> Search</button>
      </div>
      {isLoading && <div>Loading</div>}
      {status == "success" && data !== "Search resulted in an error." ? (
        data?.data.Search.map((movie) => {
          return <MovieItem movie={movie} />;
        })
      ) : (
        <div>Error</div>
      )}
      {status == "success" && data !== "Search resulted in an error." && (
        <div className="inline-flex mt-2 xs:mt-0 gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={page === 1}
            onClick={() => {
              setPage((prevState) => prevState - 1);
              refetch();
            }}
          >
            Prev
          </button>
          <p className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {page}
          </p>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => {
              setPage((prevState) => prevState + 1);
              refetch();
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
