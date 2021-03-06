export const signIn = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: {user}
  });
};

export const signOut = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
};

export const signUp = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: {user}
  });
};
