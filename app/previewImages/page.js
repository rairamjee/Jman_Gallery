'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPin, Building, Calendar, Camera, Clock, ImagePlus } from 'lucide-react'

const PreviewImages = ({ eventId }) => {
  const [images, setImages] = useState([])
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventLocation: '',
    eventOfficeLocation: '',
    eventStartDate: '',
    eventEndDate: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await axios.get('/api/event/files', {
          params: { eventId }
        })
        setImages(files.data.data.eventFiles)
        setEventDetails(files.data.data.event)
      } catch (error) {
        console.error('Error fetching event details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [eventId])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="w-full sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">{eventDetails.eventName}</h1>
        <div className="space-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <EventDetailItem
              icon={<Building className="h-4 w-4" />}
              label="Office"
              value={eventDetails.eventOfficeLocation}
            />
            <EventDetailItem
              icon={<MapPin className="h-4 w-4" />}
              label="Event Location"
              value={eventDetails.eventLocation}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <EventDetailItem
              icon={<Calendar className="h-4 w-4" />}
              label="Start"
              value={formatDate(eventDetails.eventStartDate)}
            />
            <EventDetailItem
              icon={<Clock className="h-4 w-4" />}
              label="End"
              value={formatDate(eventDetails.eventEndDate)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-purple-900" />
          Event Gallery
        </h2>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="aspect-square overflow-hidden rounded-lg shadow-sm">
                <img
                  src={image.s3Url}
                  alt={image.fileName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
            <div className="text-center">
              <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-purple-900">No images</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding images to your event gallery</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const EventDetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-purple-900">
    {icon}
    <span className="font-medium">{label}:</span>
    <span className="text-purple-900">{value}</span>
  </div>
)

const LoadingSkeleton = () => (
  <div className="w-full sm:px-6 lg:px-8 py-8">
    <div className="mb-8 space-y-4">
      <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
)

export default PreviewImages
