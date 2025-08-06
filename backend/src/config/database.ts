import mongoose from "mongoose";

interface DbState {
  value: number;
  label: string;
}

const dbState: DbState[] = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" },
];

const connection = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) {
      throw new Error("MONGO_DB_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    const state = Number(mongoose.connection.readyState);
    const stateLabel = dbState.find((f) => f.value === state)?.label || "unknown";
    console.log(stateLabel, "for mongodb"); // connected to db
  } catch (error) {
    console.log("error connect", error);
  }
};

export default connection;
