const mysql = require("mysql");

const DB_NAME = "project1";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alpha",
  multipleStatements: true, // allow running multiple CREATE queries at once
});

let connect = () => {
  db.connect(function (err) {
    if (err) {
      console.error("Initial connection failed: " + err.stack);
      return;
    }

    console.log("Connected to MySQL server.");

    // Create the database if it doesn't exist
    db.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, function (err) {
      if (err) {
        console.error("Database creation failed: " + err.stack);
        return;
      }

      console.log(`Database "${DB_NAME}" is ready.`);

      // Switch to the created or existing database
      db.changeUser({ database: DB_NAME }, function (err) {
        if (err) {
          console.error("Switching to database failed: " + err.stack);
        } else {
          console.log(`Using database "${DB_NAME}".`);

          // Create necessary tables if not exist
          const createTables = `
                      
          CREATE TABLE IF NOT EXISTS Buyer (
            buyer_id VARCHAR(8),
            name VARCHAR(30),
            phone NUMERIC(10,0),
            email VARCHAR(25),
            PRIMARY KEY (buyer_id)   
          );

          CREATE TABLE IF NOT EXISTS Seller (
            seller_id VARCHAR(8),
            name VARCHAR(30),
            phone NUMERIC(10,0),
            email VARCHAR(25),
            PRIMARY KEY (seller_id)   
          );

          CREATE TABLE IF NOT EXISTS Agent (
            agent_id VARCHAR(8),
            name VARCHAR(30),
            phone NUMERIC(10,0),
            email VARCHAR(25),
            PRIMARY KEY (agent_id)   
          );

          CREATE TABLE IF NOT EXISTS Property (
            property_id VARCHAR(8),
            seller_id VARCHAR(8),
            sell_price NUMERIC(7,0),
            upload_date Date,
            status varchar (20) check (status in ('Sold', 'On_Sale')),
            PRIMARY KEY (property_id),
            FOREIGN KEY (seller_id) REFERENCES Seller(seller_id)
          );

          CREATE TABLE IF NOT EXISTS Property_Details (
            property_id VARCHAR(8),
            area VARCHAR(10),
            bedrooms NUMERIC(3),
            swimming_pool NUMERIC(3),
            city VARCHAR(20),
            district VARCHAR(20),
            house_no NUMERIC(4,0),
            imge_link varchar(1000),
            PRIMARY KEY (property_id),
            FOREIGN KEY (property_id) REFERENCES Property(property_id) ON DELETE CASCADE
          );

          CREATE TABLE IF NOT EXISTS Transaction (
            transaction_id VARCHAR(8),
            Date date,
            Final_Price numeric(10,2),
            buyer_id VARCHAR(8),
            seller_id VARCHAR(8),
            agent_id VARCHAR(8),
            property_id VARCHAR(8),
            PRIMARY KEY (transaction_id),
            FOREIGN KEY (property_id) REFERENCES Property(property_id),
            FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id),
            FOREIGN KEY (seller_id) REFERENCES Seller(seller_id),
            FOREIGN KEY (Agent_id) REFERENCES Agent(agent_id)
          );
          `;

          db.query(createTables, function (err, results) {
            if (err) {
              console.error("Error creating tables: " + err.stack);
            } else {
              console.log("All necessary tables are created or already exist.");
            }
          });
        }
      });
    });
  });
};

module.exports = { db, connect };
