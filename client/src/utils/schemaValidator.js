async function schemaValidator(schema, value) {
  let errorMessages = null;
  let isValid;

  try {
    await schema.validate(value);
    isValid = true;
  } catch (err) {
    isValid = false;
    errorMessages = err.errors;
  }

  return { isValid, errorMessage: errorMessages && errorMessages[0] };
}

export { schemaValidator };
