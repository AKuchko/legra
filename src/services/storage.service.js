const storage = localStorage;

export const getStorageItem = (key) => {
  return storage.getItem(key);
};

export const setStorageItem = (key, value) => {
  storage.setItem(key, value);
  return value;
};

export const removeStorageItem = (key) => {
  storage.removeItem(key);
  return null;
};
