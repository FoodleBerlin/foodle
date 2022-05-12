const getEnvironmentVariable = (environmentVariable: string): string | undefined => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (environmentVariable=== "DATABASE_URL") console.log("dburl2:" + unvalidatedEnvironmentVariable)
  if (environmentVariable=== "NEXT_PUBLIC_SERVER_URL") console.log("sevvurl2:" + unvalidatedEnvironmentVariable)
  if (unvalidatedEnvironmentVariable) {
    return unvalidatedEnvironmentVariable;
  } else {
    console.log(`Couldn't find environment variable: ${environmentVariable}`)
  }
};

export const envVars = {
  DATABASE_URL: getEnvironmentVariable("DATABASE_URL"),
  SERVER_SECRET: getEnvironmentVariable("SERVER_SECRET"),
  GOOGLE_CLIENT_ID: getEnvironmentVariable("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
  STRIPE_PUBLISHABLE_KEY: getEnvironmentVariable("STRIPE_PUBLISHABLE_KEY"),
  STRIPE_SECRET_KEY: getEnvironmentVariable("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: getEnvironmentVariable("STRIPE_WEBHOOK_SECRET"),
  APP_AWS_ACCESS_KEY: getEnvironmentVariable("APP_AWS_ACCESS_KEY"),
  APP_AWS_SECRET_KEY: getEnvironmentVariable("APP_AWS_SECRET_KEY"),
  APP_AWS_REGION: getEnvironmentVariable("APP_AWS_REGION"),
  AWS_S3_BUCKET_NAME: getEnvironmentVariable("AWS_S3_BUCKET_NAME"),
  FACEBOOK_APP_SECRET: getEnvironmentVariable("FACEBOOK_APP_SECRET"),
  FACEBOOK_APP_ID: getEnvironmentVariable("FACEBOOK_APP_ID"),
  CLIENT_URL: getEnvironmentVariable("CLIENT_URL"),
  SERVER_URL: getEnvironmentVariable("NEXT_PUBLIC_SERVER_URL"),
};