async function getFileFromUrl(url) {
  if (!url) return null;

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = `user-profile-${window.crypto.randomUUID()}.jpg`;
    const file = new File([blob], filename, { type: blob.type });
    return file;
  } catch (err) {
    console.log("URL to File Conversion failed");
    return null;
  }
}

export { getFileFromUrl };
