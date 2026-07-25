const statusConfig = {
  NEW: {
    label: "New",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  CONTACTED: {
    label: "Contacted",
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  },

  CLOSED: {
    label: "Closed",
    className:
      "border-green-500/20 bg-green-500/10 text-green-400",
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.NEW;

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}