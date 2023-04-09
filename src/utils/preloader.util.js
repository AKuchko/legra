class PreloaderUtil {
  _status = "loading";

  get loaded() {
    return this._status === "loaded";
  }

  get error() {
    return this.status === "error";
  }

  get loading() {
    return this._status === "loading";
  }

  setState(newState) {
    if (!["loading", "error", "loaded"].includes(newState))
      throw new Error("Wrong type of preloader state");

    this._status = newState;
  }
}

export default new PreloaderUtil();
