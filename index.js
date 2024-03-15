const HOME=process.env.HOME;
const connectionString = `postgres://postgresql01.kube01.icncd.ru/imarketplace?sslmode=require&sslrootcert=/etc/step-ca/certs/root_ca.crt&sslcert=${HOME}/.step/certs/my.crt&sslkey=${HOME}/.step/certs/my.key`;
const config = {
  connectionString,
  ssl: true,
  // this object will be passed to the TLSSocket constructor
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
  //   key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
  //   cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  // },
};

import pkg from "pg";
const { Client, Pool } = pkg;

// import { Client, Pool } from 'pg'

const client = new Client(config);
await client.connect();
console.log("connected");
await client.end();

const pool = new Pool(config);
const pooledClient = await pool.connect();
console.log("connected");
pooledClient.release();
await pool.end();
