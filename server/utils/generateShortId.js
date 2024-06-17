import { customAlphabet } from "nanoid";

function generateShortId(length = 10) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}

export { generateShortId };
