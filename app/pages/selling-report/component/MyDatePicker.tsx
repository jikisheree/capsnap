import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const MyDatePickerPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div>
      <h1>My Date Picker Page</h1>
      <p>
        Date to be shown from date picker:{" "}
        {selectedDate
          ? new Date(selectedDate).toLocaleString()
          : "No date selected"}
      </p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={selectedDate} onChange={handleDateChange} />
      </LocalizationProvider>
    </div>
  );
};

export default MyDatePickerPage;
