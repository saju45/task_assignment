const StatusBadge = ({ status }) => {
  const colorMap = {
    Pending: "text-pink-500",
    InProgress: "text-yellow-500",
    Done: "text-green-500",
  };
  return (
    <span className={`text-sm font-semibold ${colorMap[status]}`}>
      • {status}
    </span>
  );
};

export default StatusBadge;