import { generateShortId } from "./generateShortId.js";

async function getUniqueId(Model, field) {
  let shortId = generateShortId();
  let isShortIdUnique = false;

  while (!isShortIdUnique) {
    const doc = await Model.findOne({ [field]: shortId });
    if (!doc) isShortIdUnique = true;
    else shortId = generateShortId();
  }

  return shortId;
}

export { getUniqueId };
