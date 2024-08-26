"use client";

import * as React from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePickerDemo({ date, setdate }) {
  // Get today's date to compare and disable past dates
  const today = startOfDay(new Date()); // Start of today

  // Handle date selection and format it before setting the state
  const handleDateSelect = (selectedDate) => {
    if (selectedDate && !isBefore(selectedDate, today)) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setdate(formattedDate);
    } else {
      setdate(null);
    }
  };

  // Function to disable dates before today
  const isDisabled = (day) => {
    return isBefore(day, today); // Disable only dates before today
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={handleDateSelect}
          initialFocus
          disabled={isDisabled}
        />
      </PopoverContent>
    </Popover>
  );
}
