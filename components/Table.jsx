"use client"
import { Condiment } from "next/font/google"
import { useState, useEffect } from "react"

const Table = ({ data, columns }) => {
  // state to keep searching value
  const [search, setSearch] = useState("")
  // state to keep which column is sorted
  const [sort, setSort] = useState({ column: undefined, order: "ASC" })

  // Function to trigger when any header in the table is clicked
  const onHeaderClick = (column) => {
    // if the clicked column have sorting function in it
    if (column.sortFn) {
      // if the clicked column is the same as one stored
      // i.e clicking over the same column ?
      // i.e if we clicked over the same column and the last order was Decending then remove the sorting and dont sort it anymore
      if (sort.column === column.header && sort.order === "DES")
        setSort({ column: undefined, order: "ASC" })
      else
        setSort({
          column: column.header,
          // if we clicked over the same column
          // // and the last order was Assending then change it to Decending
          // else if its not the same column change its order to Assending
          order:
            sort.column === column.header
              ? sort.order === "ASC"
                ? "DES"
                : "ASC"
              : "ASC",
        })
    }
  }

  // function used to filter and sort the rows before displaying
  const processData = (data) => {
    // create a copy of data
    let records = [...data]

    // if we have something in search and trim white spaces in it
    if (!!search.trim()) {
      // filter data to keep only that have the one we type
      records = records.filter((row) => {
        // look into all columns and see if some of the column have the value searched in it
        return columns.some((column) => {
          // use column.value to get the data displaying and make it case insensitive by change in to toLowerCase and then finding the index of the search in it
          return (
            column.value(row).toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        })
      })
    }

    // if we have sorting in state
    if (sort.column) {
      // sort the record
      records.sort((a, b) => {
        // find the column with which we have to sort it by
        const column = columns.find((column) => column.header === sort.column)

        // if the order is Assending then pass the item first and 2nd
        if (sort.order === "ASC")
          return column.sortFn(column.value(a), column.value(b))
        // if the order is Decending then pass the item 2nd and first to get opposite result
        else return column.sortFn(column.value(b), column.value(a))
      })
    }

    // return processData
    return records
  }

  return (
    <div>
      <div className="m-4 flex space-x-2 items-center justify-end">
        <div className="text-sm">Search</div>
        <input
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <table className="border-collapse text-xs w-full border-b-4 border-b-[#009879]">
        <thead>
          <tr className="bg-[#009879] text-white">
            {/* map over the column and show all columns data */}
            {columns.map((column) => (
              <td className="p-2">
                <button
                  className="w-full text-left space-x-2"
                  onClick={() => onHeaderClick(column)}
                >
                  <span>{column.header}</span>
                  {/* if the column we are sorting is the same one we are mapping show the arrow */}
                  {sort.column === column.header && (
                    <span>{sort.order === "ASC" ? "↑" : "↓"}</span>
                  )}
                </button>
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {processData(data).map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-[#f3f3f3] hover:text-[#009879]"
            >
              {/* map over the column and show all columns data */}
              {columns.map((column) => (
                <td className="p-2">{column.value(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
