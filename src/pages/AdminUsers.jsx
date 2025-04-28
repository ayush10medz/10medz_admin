import React, { useContext, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { HandleContext } from "../hooks/HandleState";
import Sidemenu from "../components/shared/Sidemenu";

const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Function to format time
const formatTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const columns = [
  {
    Header: "Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Created Date",
    accessor: "createdDate",
    Cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    Header: "Created Time",
    accessor: "createdTime",
    Cell: ({ row }) => formatTime(row.original.createdAt),
  },
];

const AdminUsers = () => {
  const { handleAllUsers, allUsers } = useContext(HandleContext);
  useEffect(() => {
    handleAllUsers();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: allUsers,
    },
    useSortBy,
    usePagination
  );

  return (
    <main className="w-[100vw]  flex flex-row items-start justify-start ">
      <Sidemenu />
      <div className="w-full flex flex-col items-center justify-center pb-10 mt-[200px] gap-32">
        <p className="text-[36px] md:text-[48px] md:leading-[56px] font-semibold capitalize">
          all registered <span className="text-[#FE6903]">phone Number</span>{" "}
        </p>
        <table
          {...getTableProps()}
          className="min-w-full lg:min-w-[80%] text-left text-sm font-light border"
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
                  className="border-b transition duration-300 ease-in-out hover:bg-[#FE6903] hover:text-white  "
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
        <div className="flex flex-row items-center justify-center w-full gap-5">
          <button
            disabled={!canPreviousPage}
            className="flex flex-col   disabled:bg-[#FE6903] disabled:bg-opacity-30   items-center justify-center py-2  px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={previousPage}
          >
            Prev
          </button>
          <span className="text-[16px] font-medium text-gray-900">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            className="flex flex-col    disabled:bg-[#FE6903] disabled:bg-opacity-30  items-center justify-center py-2  px-6 bg-[#FE6903] text-white rounded-lg"
            onClick={nextPage}
          >
            {" "}
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminUsers;
