function getCodedEmail(email) {
  if (!email) return "";
  const emailSplit = email.split("@");
  if (emailSplit[0].length > 2) return email;
  return emailSplit[0].substring(0, 2) + "***@" + emailSplit[1];
}

export { getCodedEmail };
