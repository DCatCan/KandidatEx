const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://192.168.3.39:3000" : "https://moop.com";
