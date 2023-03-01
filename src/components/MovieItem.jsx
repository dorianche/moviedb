import React from "react";

export function MovieItem(props) {
  console.log(props.movie.Title);
  return (
    <div>
      <div>{props.movie.Title}</div>
      <div>{props.movie.Year}</div>
    </div>
  );
}

export default MovieItem;
