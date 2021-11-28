import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };
  console.log({ results });
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };
    const timeoutID = setTimeout(() => {
      if (term) {
        search();
      }
    }, 500);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [term]);
  const renderedResults = results.map((result) => {
    return (
      <div className='ui list'  key={result.pageid}>
        <div className='item'>
          <div className='right floated content'>
            <a
              className='ui teal button'
              href={`https://en.wikipedia.com/?curid=${result.pageid}`}
              target='_blank'>
              Learn More
            </a>
          </div>
          <div className='header'>{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
        <div className='ui divider' />
      </div>
    );
  });

  return (
    <div className='ui container'>
      <div className='ui fluid icon input'>
        <input
          type='text'
          placeholder='Search something'
          value={term}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        />
        <i className='search icon'></i>
      </div>
      <br />
      <div>{renderedResults}</div>
    </div>
  );
};

export default Search;
