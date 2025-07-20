import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMMM d, yyyy 'at' h:mm a");
  } catch (e) {
    console.error(e);
    return date;
  }
};
