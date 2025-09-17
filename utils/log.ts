export function logObject(o: any) {
  if (typeof o !== "object" || o === null) console.log("Not An Object");

  const record: Record<string, any> = {};

  for (const v in o) {
    if (o[v]) {
      record[v] = typeof o[v];
    }
  }

  console.log("\n", record);
}
