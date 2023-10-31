export const ENV = () => {
  return {
    URL_API: process.env.URL_API,
  };
};

export const getSchema = () => {
  console.log('schema =======:: ', process.env.SCHEMA_TEST);

  if (process.env.SCHEMA_TEST) {
    console.log('schema =======:: ', process.env.SCHEMA_TEST);

    return process.env.SCHEMA_TEST;
  }
};
