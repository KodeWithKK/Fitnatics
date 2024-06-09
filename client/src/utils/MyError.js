class MyError extends Error {
  constructor(title, message) {
    super(message);
    this.title = title;
    this.message = message;
  }
}

export default MyError;
