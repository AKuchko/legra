const readFileURL = (_file) => {
  const tempReader = new FileReader();

  return new Promise((resolve, reject) => {
    tempReader.onerror = () => {
      tempReader.abort();
      reject();
    };
    tempReader.onload = () => {
      resolve(tempReader.result);
    };
    tempReader.readAsDataURL(_file);
  });
};

export default readFileURL;
