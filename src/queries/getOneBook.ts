export interface Verse {
  verse: string;
  number: number;
  study: string;
  id: number;
}

export interface Chapter {
  testament: string;
  name: string;
  num_chapters: number;
  chapter: number;
  vers: Verse[];
}

async function getOneBook(book: string, page: number, version: string): Promise<Chapter> {
  const response = await fetch(`https://bible-api.deno.dev/api/read/${version}/${book}/${page}`);
  const data = await response.json();
  return data;
}

export default getOneBook;
