interface BookResponse {
  names: string[];
  abrev: string;
  chapters: number;
  testament: string;
}

async function getBooks(): Promise<BookResponse[]> {
  const response = await fetch("https://bible-api.deno.dev/api/books");
  const data = await response.json();
  return data;
}

export default getBooks;
