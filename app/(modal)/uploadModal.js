"use client"
import React,{useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import { Button } from '@/components/ui/button';
  

function UploadModal() {

    const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Implement file upload logic here
      console.log("Uploading file:", file.name);
      // Close the modal after upload
      setFile(null);
    } else {
      alert("Please select a file first!");
    }
  };
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Open Upload Modal</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-gray-900">Upload File</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <DialogFooter className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={() => setFile(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpload} className="ml-2">
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}

export default UploadModal