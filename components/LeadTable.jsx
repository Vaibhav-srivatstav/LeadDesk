"use client";

import { LoaderCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function LeadTable({
  leads,
  updatingId,
  updateStatus,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px]">
        <thead>
          <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4 font-medium">
              Lead
            </th>

            <th className="px-5 py-4 font-medium">
              Budget
            </th>

            <th className="px-5 py-4 font-medium">
              Message
            </th>

            <th className="px-5 py-4 font-medium">
              Date
            </th>

            <th className="px-5 py-4 font-medium">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-white/5 transition hover:bg-white/[0.02]"
            >
              {/* Lead Information */}
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 font-semibold text-blue-400">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {lead.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {lead.email}
                    </p>
                  </div>
                </div>
              </td>

              {/* Budget */}
              <td className="px-5 py-5 text-sm text-slate-300">
                {lead.budgetRange}
              </td>

              {/* Message */}
              <td className="max-w-xs px-5 py-5">
                <p
                  className="truncate text-sm text-slate-400"
                  title={lead.message}
                >
                  {lead.message}
                </p>
              </td>

              {/* Date */}
              <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">
                {formatDate(lead.createdAt)}
              </td>

              {/* Status */}
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <StatusBadge status={lead.status} />

                  <select
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(event) =>
                      updateStatus(
                        lead.id,
                        event.target.value
                      )
                    }
                    className="rounded-lg border border-white/10 bg-slate-900 px-2 py-1.5 text-xs text-slate-300 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="NEW">
                      New
                    </option>

                    <option value="CONTACTED">
                      Contacted
                    </option>

                    <option value="CLOSED">
                      Closed
                    </option>
                  </select>

                  {updatingId === lead.id && (
                    <LoaderCircle
                      size={15}
                      className="animate-spin text-blue-400"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}