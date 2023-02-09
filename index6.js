let users = [{ _id: 1, username: "user1" }];

let events = [
  { _id: 1, name: "event1", date: { day: 9, month: 2, year: 2023 } },
  { _id: 2, name: "event2", date: { day: 9, month: 3, year: 2023 } },
];

let users_events = [
  { user_id: 1, event_id: 1 },
  { user_id: 1, event_id: 2 },
];

function get_events_user_date(user_id) {
  if (!users.some((user) => user._id === user_id))
    throw new Error("User not found");
  const date_now = new Date();
  const filtered = users_events
    .filter((user_event) => {
      const event_found = events.find(
        (event) => event._id === user_event.event_id
      );
      const { date } = event_found;
      const validate_date =
        date_now.getDate() === date.day &&
        date_now.getMonth() + 1 === date.month &&
        date_now.getFullYear() === date.year;
      if (user_event.user_id === user_id && validate_date) return user_event;
    })
    .map((user_event) => {
      const event_found = events.find(
        (event) => event._id === user_event.event_id
      );
      return event_found;
    });
  return filtered;
}

try {
  const filtered_events = get_events_user_date(1);
  console.log(filtered_events);
} catch (error) {
  console.error(error.message);
}
