import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
export default async function solution(articles) {
  const sql = postgres({
    ...config,
    database: 'postgres'
  });
  
  try {
    const insertedIds = [];
    
    for (const article of articles) {
      const [{ id }] = await sql`
        INSERT INTO articles (title, description)
        VALUES (${article.title}, ${article.description})
        RETURNING id
      `;
      insertedIds.push(id);
    }
    
    return insertedIds;
    
  } finally {
    await sql.end();
  }
}
// END
