"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TimePicker({ time, setTime }) {
  const [hour, setHour] = React.useState('12')
  const [minute, setMinute] = React.useState('00')
  const [period, setPeriod] = React.useState('AM')

  // Use React useEffect to update the time whenever hour, minute, or period changes
  React.useEffect(() => {
    setTime(`${hour}:${minute} ${period}`)
  }, [hour, minute, period, setTime])

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      
      {/* Hour Selector */}
      <Select onValueChange={setHour}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Hour</SelectLabel>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Minute Selector */}
      <Select onValueChange={setMinute}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Minute</SelectLabel>
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* AM/PM Selector */}
      <Select onValueChange={setPeriod}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Period</SelectLabel>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
