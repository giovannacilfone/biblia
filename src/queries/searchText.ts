interface Parameters {
  search: string;
  version: string;
  testament?: "old" | "new" | "both";
  page?: number;
}

export type VerseFound = {
  verse: string;
  study: string;
  number: number;
  id: number;
  book: string;
  chapter: number;
};

export interface SearchResponse {
  data: VerseFound[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}

// curl https://bible-api.deno.dev/api/read/nvi/search?q=Dios&take=&page=1

async function searchText({ version, search, page }: Parameters): Promise<SearchResponse> {
  const response = await fetch(
    `https://bible-api.deno.dev/api/read/${version}/search?q=${search}&take=10&page=${page}`
  );
  const data = await response.json();
  return data;
}

export default searchText;
