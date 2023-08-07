import { TableSection } from "@/container/TableSection"

// Function used to fetch data as per next 13 pattern
const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
    .then(async (response) => await response.json())
    .then((response) => response)

  return res
}

// Server side async component to fetch data
const Page = async () => {
  // fetching the data on server
  const data = await getData()

  return (
    <main className="m-4">
      <TableSection data={data} />
    </main>
  )
}

export default Page
