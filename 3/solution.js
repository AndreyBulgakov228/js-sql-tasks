import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (book) => {
  // BEGIN (write your solution here)
  const pool = postgres({
    ...config,
    database: 'postgres',
    max: 10,
    idle_timeout: 20,
  });
  
  try {
    await pool`DROP TABLE IF EXISTS books`;
    
    await pool`
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255)
      )
    `;
    
    const result = await pool`
      INSERT INTO books (title, author)
      VALUES (${book.title}, ${book.author})
      RETURNING id
    `;
    
    return result[0].id;
    
  } finally {
    await pool.end();
  }
  // END
};
