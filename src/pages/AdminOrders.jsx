import React, { useContext, useEffect, useState } from "react";
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
  // {
  //   Header: "Sales Person",
  //   accessor: "salesName",
  //   Cell: ({ value }) => (value ? `${value}` : "_"),
  // },
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
    Cell: ({ value }) => {
      if (value) {
        return (
          <button
            onClick={() => { }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Open Remarks
          </button>
        );
      }
      return "";
    },
  },
  {
    Header: "Order Timing",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
];

const AdminOrders = () => {
  const { handleAllOrders, allOrders } = useContext(HandleContext);
  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    handleAllOrders();
  }, []);

  const openRemarkModal = (order) => {
    setSelectedOrder(order);
    setIsRemarkOpen(true);
  };

  const closeRemarkModal = () => {
    setIsRemarkOpen(false);
    setSelectedOrder(null);
  };

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
      data: allOrders,
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
                        onClick={(e) => {
                          if (cell.column.id === "remark" && cell.value) {
                            e.stopPropagation();
                            openRemarkModal(row.original);
                          }
                        }}
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

        {isRemarkOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[70vw]">
              <h2 className="text-xl font-semibold mb-4">Remarked Order</h2>

              {(() => {
                let parsedRemark;
                try {
                  parsedRemark =
                    selectedOrder && selectedOrder.remark
                      ? JSON.parse(selectedOrder.remark)
                      : {};
                } catch {
                  parsedRemark = {};
                }
                const medicineData = parsedRemark.medicineData || [];
                return (
                  <div className="mb-2">
                    <div className="text-gray-800 mb-1">
                      <b>Patient Mobile:</b>{" "}
                      {parsedRemark.customerMobile || "-"}
                    </div>
                    <div className="text-gray-800 mb-1">
                      <b>Prescribed by:</b> {parsedRemark.doctorName || "-"}
                    </div>
                    <div className="text-gray-800 mb-3">
                      <b>Location:</b> {selectedOrder.location || "-"}
                    </div>

                    <h3 className="font-semibold text-lg mb-1">Medicines</h3>
                    <div className="max-h-56 overflow-y-auto border rounded">
                      <table className="min-w-full text-xs border">
                        <thead className="bg-gray-100 sticky top-0 text-gray-700">
                          <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Dose</th>
                            <th className="p-2 border">Freq</th>
                            <th className="p-2 border">Qty</th>
                            <th className="p-2 border">In Stock</th>
                            <th className="p-2 border">Net Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicineData.length === 0 && (
                            <tr>
                              <td
                                colSpan={6}
                                className="p-2 text-center text-gray-400"
                              >
                                No medicine data
                              </td>
                            </tr>
                          )}
                          {medicineData.map((med, idx) => (
                            <tr
                              key={idx}
                              className={
                                !med.availableInStock ? "bg-red-50" : ""
                              }
                            >
                              <td className="p-2 border whitespace-nowrap">
                                {med.label}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.dosage || "-"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.frequency || "-"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.quantity || "-"}
                              </td>
                              <td
                                className={`p-2 border text-center ${med.availableInStock
                                  ? "text-green-600"
                                  : "text-red-500"
                                  }`}
                              >
                                {med.availableInStock ? "Yes" : "No"}
                              </td>
                              <td className="p-2 border whitespace-nowrap">
                                {med.netPrice && med.netPrice !== "N/A"
                                  ? `₹${med.netPrice}`
                                  : med.price && med.price !== "N/A"
                                    ? `₹${med.price}`
                                    : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  onClick={closeRemarkModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminOrders;
