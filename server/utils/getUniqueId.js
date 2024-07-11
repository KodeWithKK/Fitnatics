import { getShortId } from "./getShortId.js";

async function getUniqueId(Model, field) {
  let shortId = generateShortId();
  let isShortIdUnique = false;

  while (!isShortIdUnique) {
    const doc = await Model.findOne({ [field]: shortId });
    if (!doc) isShortIdUnique = true;
    else shortId = getShortId();
  }

  return shortId;
}

export { getUniqueId };
