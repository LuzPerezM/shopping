const statusStyles: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  enviado: "bg-blue-100 text-blue-800",
  entregado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
};

export const StatusBadge = ({ status }: { status: string }) => {
  const style =
    statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${style}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
