import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/entities/event/model/types';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';

function EventTitleCell({ getValue }: CellContext<EventItem, unknown>) {
  return <span className="font-medium text-slate-800">{getValue<string>()}</span>;
}

function EventActionsCell({ row }: CellContext<EventItem, unknown>) {
  return (
    <Link to={`/events/${row.original.id}`} className="text-accent">
      View
    </Link>
  );
}

const columns: ColumnDef<EventItem>[] = [
  {
    id: 'image',
    header: '',
    cell: ({ row }) => (
      <img src={row.original.img} alt="" className="size-12 rounded object-cover" />
    ),
  },
  { accessorKey: 'title', header: 'Event', cell: EventTitleCell },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => formatEventDate(getValue<string>()),
  },
  { accessorKey: 'location', header: 'Location' },
  { id: 'actions', header: '', cell: EventActionsCell },
];

export function EventTable({ items }: { items: EventItem[] }) {
  const table = useReactTable({ data: items, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden rounded-md border border-slate-200">
      <table className="h-full w-full text-left text-ui-sm">
        <thead className="bg-slate-50 text-tiny uppercase tracking-wide text-slate-400">
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
                  className={clsx('px-3 py-3', cell.column.id === 'actions' && 'text-right')}
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
