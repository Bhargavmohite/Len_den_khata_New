import Customer_master from "@/app/Forms/customer_master";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";

export default function App() {
  return (
    <SQLiteProvider
      databaseName='len_den_khata.db'
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Customer(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT NOT NULL,
            mobileNumber INTEGER NOT NULL,
            email TEXT NOT NULL,
            creditLimit INTEGER NOT NULL,
            creditPeriod INTEGER NOT NULL
          );
        `);
      }}
    >
      <Customer_master />
    </SQLiteProvider>
  );
}
