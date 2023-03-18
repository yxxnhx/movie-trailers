import { useState, useRef, FormEvent } from "react";
import Router from "next/router";
import { MdOutlineSearch } from "react-icons/md";

export default function SearchBox() {
  const inputValue = useRef<HTMLInputElement>(null);

  const searchMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputValue.current?.value;
    if (query && query.length > 0) {
      Router.push({
        pathname: `/search/movie`,
        query: { query },
      });
      inputValue.current.value = "";
    }
  };
  return (
    <div className="nav">
      <form className="inputBox" onSubmit={searchMovie}>
        <input
          type="text"
          className="input"
          ref={inputValue}
          id="search_data"
          placeholder="당신의 영화를 찾아보세요."
        />
        <label htmlFor="search_data">
          <button aria-label="search button" className="searchButton">
            <MdOutlineSearch color="black" size={20} />
          </button>
        </label>
      </form>
      <style jsx>{`
        .inputBox {
          display: flex;
          align-items: center;
        }
        .input {
          font-size: 14px;
          border-bottom: 1px solid #000;
          padding: 10px 0;
          width: 300px;
          text-align: center;
        }

        .searchButton {
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}
