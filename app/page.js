"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";
import DropDownSelectOption from "./selectComponent";
import UploadModal from './(modal)/uploadModal';

export default function Home() {
  const [eventType, setEventType] = useState('AwayDay');
  const [eventList, setEventList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await axios.get('/api/event', {
          params: { eventType }
        });
        if (response.data) {
          setEventList(response.data.data);
          setSelectedEventId(response.data.data[0]?.eventId || ''); // Set the default selected event
        }
      } catch (error) {
        console.error("Error occurred while fetching the event list");
      }
    }

    fetchEventList();
  }, [eventType]);

  return (
    <div>
      <div className="mt-6 px-12 flex">
        <Tabs defaultValue="awayDay" className="w-full">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="awayDay" onClick={() => setEventType('AwayDay')}>Away Day</TabsTrigger>
              <TabsTrigger value="teamOuting" onClick={() => setEventType('TeamOuting')}>Team Outing</TabsTrigger>
              <TabsTrigger value="celebrations" onClick={() => setEventType('Celebration')}>Celebrations</TabsTrigger>
            </TabsList>

            <div className="gap-x-4 flex">
            <UploadModal eventList={eventList}/>
             
              <DropDownSelectOption
                eventList={eventList} 
                selectedEventId={selectedEventId} 
                onEventSelect={setSelectedEventId} 
              />
            </div>
          </div>
          <TabsContent value="awayDay">Away Day....</TabsContent>
          <TabsContent value="teamOuting">Team Outings.</TabsContent>
          <TabsContent value="celebrations">Celebrations</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
