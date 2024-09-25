export const renderBgColorStatus = (status) => {
  switch (status) {
    case "Completed":
      return "from-emerald-500 to-teal-400";
    case "Scheduling":
      return "from-blue-500 to-teal-400";
    case "Postponed":
      return "from-orange-200 to-teal-400";
    case "Canceled":
      return "from-red-200 to-red-600";
    case "WaitingForResult":
      return "from-yellow-200 to-slate-300";
    case "InProgress":
      return "from-green-200 to-slate-300";
    default:
      return "from-emerald-500 to-teal-400";
  }
};
