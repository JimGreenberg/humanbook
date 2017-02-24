export const fetchProfile = id => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${id}`
  });
};

export const updateUser = formData => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${formData.get('user[id]')}`,
    contentType: false,
    processData: false,
    data: formData
  });
};

export const fetchAllUsers = id => {
  return $.ajax({
    method: "GET",
    url: `/api/users/`
  });
};
