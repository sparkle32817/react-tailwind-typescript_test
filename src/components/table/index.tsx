import React, { useEffect, useState, Fragment, useRef, FC } from "react";
import {
  useTable,
  usePagination,
  useRowSelect
} from "react-table";

type Props = {
  columns: any;
  data: any;
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef: any = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)


const OriginTable: FC<Props> = ({
  columns,
  data,
}) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  }: any = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...columns,
      ])
    }
  )

  return (
    <Fragment>
      <table {...getTableProps()} className="w-10/12 p-5 mr-auto ml-auto my-1 data-table">
        <thead className="bg-green-500 p-5">
          {headerGroups.map((headerGroup: any, i: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="" key={`${i}-head`}>
              {Array.isArray(headerGroup.headers) &&
                headerGroup.headers.map((column: any, j: any) => (
                  <th
                    {...column.getHeaderProps()}
                    className=""
                    key={`${i}-${j}-col`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
            </tr>
          ))}
        </thead>
        <tbody className="" {...getTableBodyProps()}>
          {page.map((row: any, i: any) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination mx-auto w-10/12 mt-3">
        <button className="bg-blue-700 p-1 text-lg hover:bg-blue-600 text-white font-bold mr-2" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className="bg-blue-700 py-1 px-2 text-lg hover:bg-blue-600 text-white font-bold mr-2" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button className="bg-blue-700 py-1 px-2 text-lg hover:bg-blue-600 text-white font-bold mr-2" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="bg-blue-700 p-1 text-lg hover:bg-blue-600 text-white font-bold mr-2" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            className="border border-solid border-gray-700 outline-none rounded-sm"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          className="border border-solid border-gray-700 outline-none rounded-sm"
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15, 20, 25].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

export default OriginTable;
