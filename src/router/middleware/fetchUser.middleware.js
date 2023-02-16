const fetchUser = ({ next, store }) => {
  const { isUserStored } = store.getters;
  if (!isUserStored)
    return store
      .dispatch("fetchUserInfo")
      .then(() => next())
      .catch(() => next(false));
};

export default fetchUser;
