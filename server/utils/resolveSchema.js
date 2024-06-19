export async function resolveSchema(schema, data) {
  let error = null,
    isValid = false;

  try {
    await schema.validate(data, { abortEarly: true });
    isValid = true;
  } catch (err) {
    error = err?.message ?? {
      title: "Something went wrong",
      message: "Something went wrong while validating schema",
    };
  }

  return { error, isValid };
}
