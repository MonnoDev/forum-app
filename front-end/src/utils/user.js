export const checkUser = (users, checkingUser) => {
  return users.find(
    (users) =>
      users.email === checkingUser.email &&
      users.password === checkingUser.password
  );
};

export const showDisplayName = (user) => {
  return user ? `${user.displayName}` : "";
};
