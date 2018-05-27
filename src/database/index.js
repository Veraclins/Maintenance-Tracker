import { Pool } from 'pg';

// This instantiates a connection pool that can be imported and used in other places
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


export default pool;
