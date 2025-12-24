import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async function solution() {
  const sql = postgres({
    ...config,
    database: 'postgres'
  });
  
  try {
    await sql`
      CREATE TABLE articles (
        title VARCHAR(255),
        description VARCHAR(255)
      )
    `;
    
    await sql`
      INSERT INTO articles (title, description)
      VALUES ('Example Title', 'Example Description')
    `;
    
  } finally {
    await sql.end();
  }
}
// END
