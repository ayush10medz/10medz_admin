import React, { useContext, useEffect } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import Sidemenu from "../components/shared/Sidemenu";
import { HandleContext } from "../hooks/HandleState";
import RegisterSeller from "../components/shared/RegisterSeller";

const columns = [
  {
    Header: "Phone Number",
    accessor: "phoneNumber",
  },
  {
    Header: "Seller Name",
    accessor: "sellerName",
  },
  {
    Header: "Seller Address",
    accessor: "sellerAddress",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString(); // Format as date and time
    },
  },
  {
    Header: "Updated At",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString(); // Format as date and time
    },
  },
];

const AdminSeller = () => {
  const { handleAllSellers, sellers } = useContext(HandleContext);

  useEffect(() => {
    handleAllSellers();
  }, [handleAllSellers]);

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
      data: sellers, // Use the data from the context
    },
    useSortBy,
    usePagination
  );

  return (
    <main className="w-[100vw] relative flex flex-row items-start justify-start">
      <RegisterSeller/>
      <Sidemenu />
      <div className="w-full  flex flex-col items-center justify-center pb-10 mt-[200px] gap-32">
        <p className="text-[36px] md:text-[48px] md:leading-[56px] font-semibold capitalize ">
          all <span className="text-[#FE6903]">sellers</span>{" "}
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

export default AdminSeller;
