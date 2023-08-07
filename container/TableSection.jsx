"use client"
import Table from "@/components/Table"
import React from "react"

// component to render table section
export const TableSection = ({ data }) => {
  // columns to render in the table
  const columns = [
    {
      // header text of the column
      header: "Name",
      // fucntion to get and display value in the column
      value: (row) => row.name,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
    {
      // header text of the column
      header: "Username",
      // fucntion to get and display value in the column
      value: (row) => row.username,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
    {
      // header text of the column
      header: "Email",
      // fucntion to get and display value in the column
      value: (row) => row.email,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
    {
      // header text of the column
      header: "Phone",
      // fucntion to get and display value in the column
      value: (row) => row.phone,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
    {
      // header text of the column
      header: "Website",
      // fucntion to get and display value in the column
      value: (row) => row.website,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
    {
      // header text of the column
      header: "Company",
      // fucntion to get and display value in the column
      value: (row) => row.company.name,
      // fucntion to sort value in column
      sortFn: (a, b) => b.localeCompare(a),
    },
  ]

  return (
    <section className="rounded-lg overflow-hidden shadow border">
      <Table data={data} columns={columns} />
    </section>
  )
}
