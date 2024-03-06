export const ENV = () => {
    // console.log('process.envprocess.envprocess.env======::', process.env);
    return {
        HOST:process.env.HOST,
        PORT:process.env.PORT,
        USERNAME:process.env.USERNAME,
        PASSWORD:process.env.PASSWORD,
        DATABASE:process.env.DATABASE,
        URL_API: process.env.URL_API,
        // URL_FRONTEND: process.env.URL_FRONTEND,
        // SCHEMA_PUBLIC: process.env.SCHEMA_PUBLIC,
        // SCHEMA_TEST: process.env.SCHEMA_TEST,
        // URL_POCKETBASE: process.env.URL_POCKETBASE,
        // DB_TIMEZONE: process.env.DB_TIMEZONE,
        // MAIL_USERNAME: process.env.MAIL_USERNAME,
        // MAIL_PASSWORD: process.env.MAIL_PASSWORD,
        // MAIL_HOST: process.env.MAIL_HOST,
        // MAIL_PORT: process.env.MAIL_PORT,
        // API_KEY: process.env.API_KEY,
        // SMS_USERNAME: process.env.SMS_USERNAME,
        // SMS_PASSWORD: process.env.SMS_PASSWORD,
        // SMS_SENDER: process.env.SMS_SENDER,
        // OTP_KEY: process.env.OTP_KEY,
        // OTP_SECRET: process.env.OTP_SECRET,
        // USER_ADMIN_POCKET: process.env.USER_ADMIN_POCKET,
        // PASS_ADMIN_POCKET: process.env.PASS_ADMIN_POCKET
    };
};

export const getSchema = () => {
    console.log('schema =======:: ', process.env.SCHEMA_TEST);

    if (process.env.SCHEMA_TEST) {
        console.log('schema =======:: ', process.env.SCHEMA_TEST);

        return process.env.SCHEMA_TEST;
    }
};
