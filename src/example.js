import { DatabaseSync } from "node:sqlite";

// In memory
const memoryDatabase = new DatabaseSync(":memory:");

// In a file

const localDatabase = new DatabaseSync("./mydatabase.sqlite");

// Creating sqlite tables

memoryDatabase.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);

localDatabase.exec(`
  CREATE TABLE users(
   key INTEGER PRIMARY KEY,
   username TEXT,
   email TEXT,
   password TEXT
  ) STRICT
`);

// Create a prepared statement to insert data into the database.
const insert = memoryDatabase.prepare(
  "INSERT INTO data (key, value) VALUES (?, ?)"
);

insert.run(1, "hello");
insert.run(2, "world");
insert.run(3, "lost..");
insert.run(4, "^^");

const otherInsert = localDatabase.prepare(
  "INSERT INTO data (key, username, email, password) VALUES (?, ?, ?, ?)"
);

otherInsert.run(
  1,
  "example1",
  "example1@gmail.com",
  "Gw><F]sFrECcU[V3^Vm9;ffThMt=>A"
);
otherInsert.run(
  2,
  "example2",
  "example2@gmail.com",
  "d:C:n)<(CWDd]8Kf+xvhUg5+hcA@.Y"
);
otherInsert.run(
  3,
  "example3",
  "example3@gmail.com",
  "&T93EuJA>j.3rfFfD=#t(GCcYt4Yw."
);
otherInsert.run(
  4,
  "example4",
  "example4@gmail.com",
  "3*#sBdY[a45:=u2P*8?2mS7?&AA=Sj"
);

// Use the prepare method to read the data from the database

const data = memoryDatabase.prepare("SELECT * FROM data ORDER BY key");

console.log(data.all());

/*
  Output:
   Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' }, { key: 3, value: 'lost..' }, { key: 4, value: '^^' } ]
*/

const users = localDatabase.prepare("SELECT * FROM users ORDER BY key");

console.log(users.all());

/*
  Output:
   Prints: [
    { key: 1, username: "example1", email: "example1@gmail.com", password: "Gw><F]sFrECcU[V3^Vm9;ffThMt=>A" },
    { key: 2, username: "example2", email: "example2@gmail.com", password: "d:C:n)<(CWDd]8Kf+xvhUg5+hcA@.Y" },
    { key: 3, username: "example3", email: "example3@gmail.com", password: "&T93EuJA>j.3rfFfD=#t(GCcYt4Yw." },
    { key: 4, username: "example4", email: "example4@gmail.com", password: "3*#sBdY[a45:=u2P*8?2mS7?&AA=Sj" },
   ]
*/
