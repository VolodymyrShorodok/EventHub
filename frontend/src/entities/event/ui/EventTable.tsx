import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../model/types';

export function EventTable({ items }: { items: EventItem[] }) {
  const columns = useMemo<ColumnDef<EventItem>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Event',
        cell: ({ getValue }) => (
          <span className="font-medium text-slate-800">{getValue<string>()}</span>
        ),
      },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'date', header: 'Date' },
      { accessorKey: 'location', header: 'Location' },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <Link to={`/events/${row.original.id}`} className="text-[#258be4]">
            View
          </Link>
        ),
      },
    ],
    [],
  );
  const table = useReactTable({ data: items, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-slate-50 text-[9px] uppercase tracking-wide text-slate-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100 text-slate-600">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-3 py-3 ${cell.column.id === 'actions' ? 'text-right' : ''}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
