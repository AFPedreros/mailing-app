import Airtable from "airtable"

interface Record {
  id: string
  fields: Airtable.FieldSet
}

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY as string,
}).base(process.env.AIRTABLE_BASE_ID as string)

function getMinifiedRecords(records: ReadonlyArray<Record>): Record[] {
  return records.map(function (record: Record) {
    return minifyRecord(record)
  })
}

function minifyRecord(record: Record): Record {
  return {
    id: record.id,
    fields: record.fields,
  }
}

export async function getNews(country: string) {
  let table

  if (country === "Brasil") {
    table = base(process.env.AIRTABLE_NOTICIAS_BR as string)
  } else {
    table = base(process.env.AIRTABLE_NOTICIAS_RA as string)
  }

  const records: ReadonlyArray<Record> = (await table
    .select({})
    .all()) as ReadonlyArray<Record>

  const minifiedRecords: Record[] = await getMinifiedRecords(records)

  // const products = minifiedRecords.map((product) => {
  //   return {
  //     name: product.fields.Nombre?.toString() ?? "",
  //     id: parseInt(product.fields.Id?.toString() ?? "0"), // convert string to number
  //     description: product.fields.Descripción?.toString() ?? "0",
  //     price: parseFloat(product.fields.Precio?.toLocaleString() ?? "0"), // convert string to number
  //     url: product.fields.Imagen?.toString() ?? "",
  //   }
  // })

  return minifiedRecords
}
