"use client";
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import DropDownSelectOption from "./selectComponent";
import UploadModal from './(modal)/uploadModal';
import PreviewImages from './previewImages/page';

export default function Home() {
  const [eventType, setEventType] = useState('AwayDay');
  const [eventList, setEventList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchEventList();
  }, [eventType]);


  return (
    <div>
      <div className="mt-6 px-12 flex">
        <Tabs defaultValue="awayDay" className="w-full">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="awayDay" onClick={() => { setEventType('AwayDay'); setSelectedEventId(''); }}>Away Day</TabsTrigger>
              <TabsTrigger value="teamOuting" onClick={() => { setEventType('TeamOuting'); setSelectedEventId(''); }}>Team Outing</TabsTrigger>
              <TabsTrigger value="celebrations" onClick={() => { setEventType('Celebration'); setSelectedEventId(''); }}>Celebrations</TabsTrigger>

            </TabsList>

            <div className="gap-x-4 flex">
              <UploadModal eventList={eventList} />
              <DropDownSelectOption
                eventList={eventList}
                selectedEventId={selectedEventId}
                onEventSelect={setSelectedEventId}
              />
            </div>
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-lg">
            {loading ? (
              <p>Loading...</p> // You can replace this with a loading spinner or skeleton
            ) : (
              <>
                <TabsContent value="awayDay">{selectedEventId && <PreviewImages eventId={selectedEventId} />}</TabsContent>
                <TabsContent value="teamOuting">{selectedEventId && <PreviewImages eventId={selectedEventId} />}</TabsContent>
                <TabsContent value="celebrations">{selectedEventId && <PreviewImages eventId={selectedEventId} />}</TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
