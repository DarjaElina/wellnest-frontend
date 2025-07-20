import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  year: number;
  monthIndex: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const startYear = 2018;

const yearOptions = Array.from(
  { length: currentYear - startYear + 2 },
  (_, i) => startYear + i,
);

export default function MoodCalendarToolBar({
  year,
  monthIndex,
  setYear,
  setMonthIndex,
}: Props) {
  function prevMonth() {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  }

  function nextMonth() {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <Button
        onClick={prevMonth}
        className="cursor-pointer"
        aria-label="Previous Month"
        size="icon"
      >
        <ChevronLeft size={18} />
      </Button>

      <div className="flex flex-wrap gap-2">
        <Select
          value={monthIndex.toString()}
          onValueChange={(val) => setMonthIndex(Number(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, i) => (
              <SelectItem key={m} value={i.toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={year.toString()}
          onValueChange={(val) => setYear(Number(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={nextMonth}
        className="cursor-pointer "
        aria-label="Next Month"
        size="icon"
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
