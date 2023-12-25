import mongoose from "mongoose";

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Successfully Connected to DB :) ");
  } catch (error) {
    console.log("Uppss Something went wrong !!! ");
    console.log(error);
  }
};
export { mongoDBConnection };
