'use client'

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Page()
{
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const router = useRouter();

    // Handle video file selection
    const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) =>
        {
            const file = e.target.files?.[0] || null;
            
            // Check file size limit 50MB
            if (file && file.size > 50 * 1024 * 1024)
            { 
                alert('Please upload a video smaller than 50MB.');
                return;
            }
            
            setVideoFile(file);
            setUploadStatus('');
        };

    // Next: Upload the video file into Azure Storage
    const handleUploadToAzure = async() =>
    {
        if (!videoFile)
        {
            alert('Upload video');
            return;
        }

        try
        {

        }
        catch (error)
        {
            
        }
    }
    
}
