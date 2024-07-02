const currentUrl = window.location.href;
const url = new URL(currentUrl);
const baseAddress = `${url.protocol}//${url.host}`;
console.log({baseAddress});

export default {
    developmentUri: baseAddress === "https://staff.masterplumbers.org.nz" ? process.env.REACT_APP_URI_PROD : process.env.REACT_APP_URI_DEV,
    developmentUsername: process.env.REACT_APP_USERNAME_DEV,
    developmentPassword: process.env.REACT_APP_PASSWORD_DEV,
    productionUri: "",
    directDebitQueryPath: process.env.REACT_APP_DIRECT_DEBIT_QUERY_PATH,
};