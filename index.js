const users = [
  { _id: 1, username: "juanlopez", email: "juanlopez@gmail.com" },
  { _id: 2, username: "juanlopez2", email: "juanlopez2@gmail.com" },
];

const courses = [
  { _id: 1, title: "course1", category: "programming" },
  { _id: 2, title: "course1", category: "tech" },
];

const users_courses = [
  { user_id: 1, course_id: 1 },
  { user_id: 1, course_id: 2 },
  { user_id: 2, course_id: 2 },
];

const data_user = {
  _id: 2,
};

function get_courses_user(data_user) {
  const { _id } = data_user;
  let filtered = users_courses
    .filter((user_course) => {
      const { user_id } = user_course;
      if (user_id === _id) return user_course;
    })
    .map((user_course) => {
      const { course_id } = user_course;
      return course_id;
    });
  let data_courses = filtered.map((course_id) => {
    const course_found = courses.find((course) => {
      const { _id } = course;
      if (_id === course_id) return course;
    });
    return course_found;
  });
  return data_courses;
}
console.log(get_courses_user(data_user));

function get_qty_courses(data_user) {
  const { _id } = data_user;
  let total = users_courses.reduce((total, user_course) => {
    const { user_id } = user_course;
    if (user_id === _id) return total + 1;
    else return total;
  }, 0);
  return total;
}
console.log(get_qty_courses(data_user));

function get_courses_category(data_user, category) {
  const { _id } = data_user;
  let filtered = users_courses
    .filter((user_course) => {
      const { user_id, course_id } = user_course;
      const course_found = courses.find((course) => {
        const { _id } = course;
        if (_id === course_id) return course;
      });
      if (user_id === _id && course_found.category === category)
        return user_course;
    })
    .map((user_course) => {
      const { course_id } = user_course;
      return course_id;
    });
  let data_courses = filtered.map((course_id) => {
    const course_found = courses.find((course) => {
      const { _id } = course;
      if (_id === course_id) return course;
    });
    return course_found;
  });
  return data_courses;
}
console.log(get_courses_category(data_user, "tech"));

function get_qty_courses_category(data_user, category) {
  const { _id } = data_user;
  let total = users_courses.reduce((total, user_course) => {
    const { user_id, course_id } = user_course;
    const course_found = courses.find((course) => {
      const { _id } = course;
      if (_id === course_id) return course;
    });
    if (_id === user_id && course_found.category === category) return total + 1;
    else return total;
  }, 0);
  return total;
}
console.log(get_qty_courses_category(data_user, "tech"));
