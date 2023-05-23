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

const b64toBlob = (dataURI) => {
  let byteString = atob(dataURI.split(",")[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
};

module.exports = { readFileURL, b64toBlob };
