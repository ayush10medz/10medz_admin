import React, { useContext, useEffect } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import Sidemenu from "../components/shared/Sidemenu";
import { HandleContext } from "../hooks/HandleState";

const columns = [
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ value }) => (value ? `${value}` : "_"),
  },
  {
    Header: "Sales Person",
    accessor: "salesName",
    Cell: ({ value }) => (value ? `${value}` : "_"),
  },
  {
    Header: "Prescription",
    accessor: "prescriptionLink",
    Cell: ({ value }) => (
      <img
        src={value}
        alt="Prescription"
        className="w-16 h-16 cursor-pointer"
        onClick={() => window.open(value)}
      />
    ),
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) => (value ? `₹${value}` : "Price not updated"),
  },
  {
    Header: "Bill",
    accessor: "billLink",
    Cell: ({ value }) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Bill
        </a>
      ) : (
        "Bill not found"
      ),
  },
  {
    Header: "Order Status",
    accessor: "orderStatus",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Remark",
    accessor: "remark",
  },
  {
    Header: "Order Timing",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString(); // Format as date and time
    },
  },
];

const AdminOrders = () => {
  const { handleAllOrders, allOrders } = useContext(HandleContext);

  useEffect(() => {
    handleAllOrders();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: allOrders, // Use the data from the context
    },
    useSortBy,
    usePagination
  );

  return (
    <main className="w-[100vw] flex flex-row items-start justify-start">
      <Sidemenu />
      <div className="w-full  flex flex-col items-center justify-center pb-10 mt-[200px] gap-32">
        <p className="text-[36px] md:text-[48px] md:leading-[56px] font-semibold capitalize ">
          all <span className="text-[#FE6903]">orders</span>{" "}
        </p>
        <div className="overflow-x-auto w-full flex flex-col items-center justify-center scroll">
          <table
            {...getTableProps()}
            className="min-w-full lg:min-w-[95%] text-left text-sm font-light border"
          >
            <thead className="border-b font-medium dark:border-neutral-500">
              {headerGroups.map((hg) => (
                <tr {...hg.getHeaderGroupProps()}>
                  {hg.headers.map((header) => (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                      scope="col"
                      className="px-6 py-4"
                    >
                      {header.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b transition duration-300 ease-in-out hover:bg-[#FE6903] hover:text-white"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="whitespace-nowrap px-6 py-4 font-normal"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-5">
          <button
            disabled={!canPreviousPage}
            className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={previousPage}
          >
            Prev
          </button>
          <span className="text-[16px] font-medium text-gray-900">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminOrders;
