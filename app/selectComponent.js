import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

const DropDownSelectOption = ({ eventList, selectedEventId, onEventSelect }) => {
  return (
    <Select value={selectedEventId} onValueChange={onEventSelect}>
      <SelectTrigger className="text-purple-900">
        <SelectValue placeholder="Select Event" />
      </SelectTrigger>
      <SelectContent>
        {eventList.map((event) => (
          <SelectItem key={event.eventId} value={event.eventId}>
            {event.eventName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DropDownSelectOption;
