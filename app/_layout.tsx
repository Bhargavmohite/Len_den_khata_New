import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import "../global.css";

export default function RootLayout() {
  return (
    <Suspense fallback={null}>
      <SQLiteProvider
        databaseName='len_den_khata.db'
        onInit={async (db) => {
          try {
            // 1️⃣ Enable FK first
            await db.execAsync("PRAGMA foreign_keys = ON");

            // 2️⃣ Create tables ONLY
            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Customer (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerName TEXT NOT NULL,
                MBCountryCode TEXT NOT NULL DEFAULT '+91',
                mobileNumber INTEGER NOT NULL,
                email TEXT NOT NULL,
                creditLimit INTEGER NOT NULL,
                creditPeriod INTEGER NOT NULL
              );
            `);

            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Supply (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                supplyName TEXT NOT NULL,
                MBCountryCode TEXT NOT NULL DEFAULT '+91',
                mobileNumber INTEGER NOT NULL,
                email TEXT NOT NULL,
                creditLimit INTEGER NOT NULL,
                creditPeriod INTEGER NOT NULL
              );
            `);

            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Bank (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bankName TEXT NOT NULL
              );
            `);

            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Purchase (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                InvoiceNo INTEGER NOT NULL,
                invoiceDate TEXT NOT NULL,
                supplyId INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                narration TEXT,
                FOREIGN KEY (supplyId) REFERENCES Supply(id)
              );
          `);

            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Sales (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                InvoiceNo INTEGER NOT NULL,
                invoiceDate TEXT NOT NULL,
                customerId INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                narration TEXT,
                FOREIGN KEY (customerId) REFERENCES Customer(id)
              );`);

            // await db.execAsync(`DROP TABLE IF EXISTS Signup;`);

            await db.execAsync(`
              CREATE TABLE IF NOT EXISTS Signup (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Shopname TEXT NOT NULL,
                Fullname TEXT NOT NULL,
                Email TEXT NOT NULL,
                mobileNumber TEXT NOT NULL,
                startDate TEXT,
                endDate TEXT,
                receiptNumber TEXT
              );`);
          } catch (err) {
            console.error("SQLite init Error:", err);
          }
        }}
      >
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />

          <Stack.Screen
            name='Forms/Customer_master'
            options={{ title: "Customer master" }}
          />

          <Stack.Screen
            name='Forms/showCustomer'
            options={{ title: "List of Customers" }}
          />

          <Stack.Screen
            name='Forms/supply_master'
            options={{ title: "Suppliers master" }}
          />

          <Stack.Screen
            name='Forms/showSupply'
            options={{ title: "List of Suppliers" }}
          />

          <Stack.Screen
            name='Forms_T/purchase'
            options={{ title: "Purchase Master" }}
          />

          <Stack.Screen
            name='Forms_T/sales'
            options={{ title: "Sales Master" }}
          />

          <Stack.Screen
            name='Forms_T/showPurchase'
            options={{ title: "List of Purchases" }}
          />

          <Stack.Screen
            name='Forms_T/showSales'
            options={{ title: "List of Sales" }}
          />

          <Stack.Screen
            name='login_Signup/login'
            options={{ title: "Login", headerTitleAlign: "center" }}
          />

          <Stack.Screen
            name='login_Signup/signup'
            options={{ title: "Signup", headerTitleAlign: "center" }}
          />

          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
