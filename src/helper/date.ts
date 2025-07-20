import { format, parse } from "date-fns";

export const formatDate = (date: string) => {
  const formattedDate = format(
    parse(date, "yyyy-MM-dd HH:mm:ss", new Date()),
    "MMMM d, yyyy 'at' h:mm a",
  );

  return formattedDate;
};
