function deepObjectSearch<T extends object>(
  array: T[],
  search: string,
  { includes }: { includes: string[] } = { includes: [] }
): T[] {
  search = search.toLowerCase();

  return array.filter((i) => {
    for (const key of Object.keys(i)) {
      const val = (i as any)[key]?.toString().toLowerCase();
      if (typeof (i as any)[key] === "object") {
        continue;
      }
      if (
        !includes.includes(key) ? val.startsWith(search) : val.includes(search)
      ) {
        return true;
      }
    }
  });
}

export default deepObjectSearch;
