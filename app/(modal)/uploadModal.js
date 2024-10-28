"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { ImagePlus, ImageUp, CircleX } from "lucide-react";
import axios from 'axios';
import PreviewImages from '../previewImages/page';

const UploadModal = ({ eventList }) => {
  const [files, setFiles] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [filesToUpload,setFilesToUpload]=useState([]);
  const [isOpen ,setIsOpen]=useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesToUpload(selectedFiles);

    // Check total files including currently selected ones
    if (files.length + selectedFiles.length > 12) {
      toast.error("You can upload a maximum of 12 photos at once");
      return;
    }

    const fileUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setFiles(prevFiles => [...prevFiles, ...fileUrls]);
  };

  const handleUpload = async() => {
    if (files.length && selectedEvent) {
      for(let i=0;i<filesToUpload.length;i++){
        console.log(filesToUpload[i].name.split('.')[1])
        const response =await axios.post('/api/upload',{
          uploadedBy:2,
          originalFileName:filesToUpload[i].name,
          contentType:`image/${filesToUpload[i].name.split('.')[1]}`,
          eventId:selectedEvent
        })
        
        const {presignedUploadUrl} =response.data;

        try {
          const s3Response= await axios.put(presignedUploadUrl,filesToUpload[i],{
            headers: {
              'Content-Type': `image/${filesToUpload[i].name.split('.')[1]}`,
          },
          })

          if (s3Response.status !== 200) {
            throw new Error('Failed to upload the file to S3.');
        }
        } catch (error) {
          console.error(error);
          throw new Error('Error uploading the file: ' + error.message);
        }
        
        const res=await axios.post('/api/upload/save',{
          uploadedBy:2,
          fileName:filesToUpload[i].name,
          contentType:`image/${filesToUpload[i].name.split('.')[1]}`,
          eventId:selectedEvent,
          key:response.data.key
        })

        if(res.status===201){
          toast.success("Files Uploaded Successfully");
          setIsOpen(false);
          <PreviewImages eventId={selectedEvent}></PreviewImages>
        }
      }

      // console.log(selectedEvent);
      setFiles([]); // Clear previews after upload
      setSelectedEvent(""); // Reset selected event after upload
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={()=>{
          setIsOpen(true)
        }}>
          <ImagePlus />
          Upload Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-purple-900 text-2xl">Upload Images to Event</DialogTitle>
          <DialogDescription className="text-pink-600">
            Select One or Multiple Image(s)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Select Event */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">Select Event</label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm text-pink-600"
            >
              <option value="">Select an event</option>
              {eventList.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">Choose Images</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground text-pink-600" />
                  <p className="text-sm text-muted-foreground text-pink-600">
                    Click to upload or drag and drop multiple images
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Image Previews */}
          {files.length > 0 && files.length < 13 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-purple-900">Selected Images:</h3>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {files.map((fileUrl, index) => (
                  <img key={index} src={fileUrl} alt={`Preview ${index}`} className="w-100 h-auto rounded" />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={() => setFiles([])}>
            <CircleX /> Cancel
          </Button>
          <Button variant="secondary" onClick={handleUpload} className="ml-2">
            <ImageUp /> Upload
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}

export default UploadModal;
