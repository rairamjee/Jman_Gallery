"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreviewImages = ({ eventId }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const files = await axios.get('/api/event/files', {
                    params: { eventId }
                });
                setImages(files.data.data);
                console.log(files.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFiles();
    }, [eventId]);

    return (
        <div>
            <h2>Image Previews</h2>
            <div className="image-grid">
                {images.map((image) => (
                   (<div key={image.id} className="image-item">
                        <img 
                            src={image.s3Url} 
                            alt={image.fileName} 
                            style={{ width: '200px', height: 'auto' }} 
                        />
                        <p>{image.fileName}</p>
                    </div>)
                ))}
            </div>
        </div>
    );
};

export default PreviewImages;
