let users = [
  { _id: 1, username: "user1" },
  { _id: 2, username: "user2" },
];

let data_user = {
  _id: 1,
};

let questions = [
  { _id: 1, text: "question1", type: "easy", user_id: 1 },
  { _id: 2, text: "question1", type: "hard", user_id: 2 },
  { _id: 3, text: "question3", type: "hard", user_id: 2 },
  { _id: 4, text: "question4", type: "hard", user_id: 2 },
];

function get_questions_user(data_user) {
  const { _id } = data_user;
  let filtered = questions.filter((question) => {
    const { user_id } = question;
    if (_id === user_id) return question;
  });
  return filtered;
}

console.log(get_questions_user(data_user));

function get_questions_user_types(data_user, types) {
  const { _id } = data_user;
  let filtered = questions.filter((question) => {
    const { user_id, type: type_question } = question;
    if (_id === user_id && types.includes(type_question)) return question;
  });
  return filtered;
}
console.log(get_questions_user_types(data_user, ["easy", "hard"]));

function get_questions_filter(users_ids, types) {
  let filtered = questions
    .filter((question) => {
      const { user_id, type: type_question } = question;
      if (users_ids.includes(user_id) && types.includes(type_question))
        return question;
    })
    .map((question) => {
      const { _id } = question;
      return _id;
    });
  return filtered;
}
console.log(get_questions_filter([2], ["medium", "hard"]));

function get_monitoring(user_id) {
  let data = {};
  let filtered = questions.filter((question) => {
    const { user_id: question_user } = question;
    if (user_id === question_user) return question;
  });
  filtered.forEach((question) => {
    const { type: type_question } = question;
    if (!(type_question in data)) data[type_question] = [question];
    else data[type_question] = [...data[type_question], question];
  });
  return data;
}
console.log(get_monitoring(2));

// get users where only type
function get_users_only(type) {
  let filtered = users.filter((user) => {
    const { _id } = user;
    let questions_user = questions.filter((question) => {
      const { user_id } = question;
      if (_id === user_id) return question;
    });
    if (
      questions_user.every((question) => {
        const { type: type_question } = question;
        if (type_question === type) return question;
      })
    )
      return user;
  });
  return filtered;
}
console.log(get_users_only("hard"));
