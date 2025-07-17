import { useState } from "react";
import MoodCalendar from "./mood-calendar";
import MoodCalendarToolBar from "./mood-calendar-toolbar";

export default function MoodCalendarContainer() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState<number>(today.getMonth());

  return (
    <div className="space-y-4">
      <MoodCalendarToolBar
        year={year}
        monthIndex={monthIndex}
        setYear={setYear}
        setMonthIndex={setMonthIndex}
      />
      <MoodCalendar year={year} monthIndex={monthIndex} />
    </div>
  );
}
