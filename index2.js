let data_user = {
  _id: 1,
  likes_categories: ["action", "fiction"],
  dislikes_categories: ["mystery"],
};

const movies = [
  { _id: 1, title: "movie1", category: "mystery" },
  { _id: 2, title: "movie2", category: "fiction" },
  { _id: 3, title: "movie3", category: "terror" },
  { _id: 4, title: "movie4", category: "science" },
];

// movies views user
const users_movies = [
  { user_id: 1, movie_id: 2 },
  { user_id: 1, movie_id: 3 },
];

function get_movies(data_user, key) {
  let filtered = movies.filter((movie) => {
    const { category } = movie;
    if (data_user[key] && data_user[key].includes(category)) return movie;
  });
  return filtered;
}
console.log("DISLIKES", get_movies(data_user, "dislikes_categories"));

function add_category_movie(data_user, category, key) {
  if (data_user[key] && !data_user[key].includes(category)) {
    data_user[key].push(category);
  }
}
add_category_movie(data_user, "terror", "likes_categories");
console.log(data_user);

console.log("LIKES", get_movies(data_user, "likes_categories"));

function sort_movies(data_user) {
  const { likes_categories, dislikes_categories } = data_user;
  movies.sort((a, b) => {
    if (
      likes_categories.includes(a.category) &&
      dislikes_categories.includes(b.category)
    )
      return -1;
    else if (
      dislikes_categories.includes(a.category) &&
      likes_categories.includes(b.category)
    )
      return 1;
    return 0;
  });
}
sort_movies(data_user);
console.log("SORT", movies);

function get_data_movies(filtered) {
  let data_movies = filtered.map((movie_id) => {
    const movie_found = movies.find((movie) => {
      const { _id } = movie;
      if (movie_id === _id) return movie;
    });
    return movie_found;
  });
  return data_movies;
}

function get_views_movies(data_user) {
  const { _id } = data_user;
  let filtered = users_movies
    .filter((user_movie) => {
      const { user_id } = user_movie;
      if (user_id === _id) return user_movie;
    })
    .map((user_movie) => {
      const { movie_id } = user_movie;
      return movie_id;
    });
  return get_data_movies(filtered);
}
console.log("VIEWS", get_views_movies(data_user));

function get_views_movies_likes(data_user) {
  const { _id, likes_categories } = data_user;
  let filtered = users_movies
    .filter((user_movie) => {
      const { user_id, movie_id } = user_movie;
      const movie_found = movies.find((movie) => {
        const { _id } = movie;
        if (movie_id === _id) return movie;
      });
      const { category } = movie_found;
      if (user_id === _id && likes_categories.includes(category))
        return user_movie;
    })
    .map((user_movie) => {
      const { movie_id } = user_movie;
      return movie_id;
    });
  return get_data_movies(filtered);
}
console.log("VIEWS LIKES", get_views_movies_likes(data_user));
