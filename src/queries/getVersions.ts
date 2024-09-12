export interface Version {
  name: string;
  version: string;
  uri: string;
}

async function getVersions(): Promise<Version[]> {
  const response = await fetch("https://bible-api.deno.dev/api/versions");
  const data = await response.json();
  return data;
}

export default getVersions;
