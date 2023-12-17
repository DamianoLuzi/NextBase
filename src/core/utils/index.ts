const production = process.env.NODE_ENV === "production";
//reusable site url (dependent on environment) for making request to API routes
export const SITE_URL = production ? "prod-url" : "http://localhost:3000";