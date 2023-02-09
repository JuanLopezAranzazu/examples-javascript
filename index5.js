let SOs = ["windows 7", "windows 8", "windows 10", "windows 11"];
let processors = ["intel core i3", "intel core i5", "intel core i7"];
let memories = ["2gb ram", "4gb ram", "8gb ram", "16gb ram"];

let data = {
  requirements: {
    SO: "windows 11",
    processor: "intel core i3",
    memory: "8gb ram",
  },
};

let games = [
  {
    _id: 1,
    text: "game1",
    requirements: {
      SO: "windows 7",
      processor: "intel core i5",
      memory: "4gb ram",
    },
  },
  {
    _id: 2,
    text: "game2",
    requirements: {
      SO: "windows 11",
      processor: "intel core i3",
      memory: "8gb ram",
    },
  },
];

function get_index(array, value) {
  let index = array.findIndex((element) => element === value);
  return index;
}

function validate_data(rq_data, rq_game) {
  const keys = ["SO", "processor", "memory"];
  let value = true;
  keys.forEach((key) => {
    const array =
      key === "SO" ? SOs : key === "processor" ? processors : memories;
    const index_data = get_index(array, rq_data[key]);
    const index_game = get_index(array, rq_game[key]);
    value = value && index_data >= index_game;
  });
  return value;
}

function get_games_requirements(data) {
  const { requirements: rq_data } = data;
  let filtered = games.filter((game) => {
    const { requirements: rq_game } = game;
    if (validate_data(rq_data, rq_game)) return game;
  });
  return filtered;
}
console.log(get_games_requirements(data));

function get_games_filter({ key, value }) {
  let filtered = games.filter((game) => {
    const { requirements: rq_game } = game;
    if (rq_game[key] === value) return game;
  });
  return filtered;
}
console.log(get_games_filter({ key: "memory", value: "8gb ram" }));

function get_random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function get_new_data() {
  let data = {};
  const keys = ["SO", "processor", "memory"];
  keys.forEach((key) => {
    const array =
      key === "SO" ? SOs : key === "processor" ? processors : memories;
    const index = get_random(0, array.length);
    data[key] = array[index];
  });
  return data;
}
console.log("RANDOM", get_new_data());
