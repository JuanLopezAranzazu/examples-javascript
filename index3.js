let users = [
  { _id: 1, username: "user1" },
  { _id: 2, username: "user2" },
];

let orders = [
  { _id: 1, user_id: 1, price: 52462 },
  { _id: 2, user_id: 1, price: 52626 },
];

const data_user = {
  _id: 1,
};

function get_orders_user(data_user) {
  const { _id } = data_user;
  let filtered = orders.filter((order) => {
    const { user_id } = order;
    if (user_id === _id) return order;
  });
  let total = orders.reduce((total, order) => {
    const { user_id, price } = order;
    if (user_id === _id) return total + price;
    else return total;
  }, 0);
  let data = { total, orders: filtered };
  return data;
}
console.log(get_orders_user(data_user));

function get_orders_not_user() {
  let filtered = users.filter((user) => {
    const { _id } = user;
    if (!orders.some((order) => order.user_id === _id)) return user;
  });
  return filtered;
}
console.log(get_orders_not_user());

function get_orders_yes_user() {
  let filtered = users
    .filter((user) => {
      const { _id } = user;
      if (orders.some((order) => order.user_id === _id)) return user;
    })
    .map((user) => {
      let total = 0;
      let filtered = orders.filter((order) => {
        const { user_id } = order;
        if (user_id === user._id) {
          total = total + order.price;
          return order;
        }
      });
      return { user, total, orders: filtered };
    });
  return filtered;
}
console.log(get_orders_yes_user());
