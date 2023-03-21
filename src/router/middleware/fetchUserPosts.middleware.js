const fetchPosts = ({ next, store }) => {
  const { isUserStored } = store.getters;
  if (isUserStored)
    return store
      .dispatch("fetchUserPosts")
      .then(() => next())
      .catch(() => next(false));
  else next(false);
};

export default fetchPosts;
