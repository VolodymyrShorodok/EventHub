import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type ColumnDef,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import type { EventItem } from '@/entities/event/types';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';

function EventTitleCell({ getValue }: CellContext<EventItem, unknown>) {
  return <span className="font-medium text-slate-800">{getValue<string>()}</span>;
}

function EventActionsCell({ row }: CellContext<EventItem, unknown>) {
  const url = `/events/${row.original.id}`;
  return (
    <Link
      to={url}
      onClick={(e) => e.stopPropagation()}
      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-ui font-medium text-white shadow-sm hover:bg-primary-hover hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      aria-label={`View ${row.original.title}`}
    >
      View
    </Link>
  );
}

const columns: ColumnDef<EventItem>[] = [
  {
    id: 'image',
    header: '',
    cell: ({ row }) => (
        <img src={row.original.img} alt="" className="w-28 h-28 rounded object-cover max-h-full" />
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
  const navigate = useNavigate();
  const table = useReactTable({ data: items, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-slate-200">
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="table-fixed w-full text-left text-ui-sm">
          <colgroup>
             <col style={{ width: 180 }} />
            <col />
            <col style={{ width: '18%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '26%' }} />
            <col style={{ width: 96 }} />
          </colgroup>
          <thead className="bg-slate-50 text-tiny uppercase tracking-wide text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-2 text-left align-middle">
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
              <tr
                key={row.id}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/events/${row.original.id}`);
                }}
                onClick={() => navigate(`/events/${row.original.id}`)}
                className="border-t border-slate-100 text-slate-600 align-middle h-28 hover:bg-slate-50 hover:shadow-sm cursor-pointer transition"
              >
                  {row.getVisibleCells().map((cell) => (
                  <td
                  key={cell.id}
                  className={clsx(
                        'px-4 py-3 align-middle',
                    cell.column.id === 'actions' && 'text-right',
                  )}
                >
                  {cell.column.id === 'image' ? (
                    <div className="flex items-center">
                      <img
                        src={row.original.img}
                        alt=""
                        className="w-28 h-28 rounded object-cover max-h-full"
                        />
                    </div>
                  ) : (
                    <div className="truncate">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  )}
                </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
