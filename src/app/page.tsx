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
<<<<<<< HEAD
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
=======
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

    const handleUploadToAzure = async () =>
>>>>>>> 7f74ee0 (Update basic concepts)
    {
        if (!videoFile)
        {
            alert('Upload video');
            return;
        }

        try
        {
<<<<<<< HEAD

        }
        catch (error)
        {
            
        }
    }
    
}
=======
            setUploadStatus('Preparing file for upload...');
            const fileName = videoFile.name;
            const fileContentType = videoFile.type;
        
            // Convert file to base64
            const fileData = await fileToBase64(videoFile);
        
            setUploadStatus('Uploading to server...');
            console.log("Uploading to server...");
        
            // Send file data to API route
            const response = await fetch('/api/uploadToAzure',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileName, fileContentType, fileData }),
            });
        
            if (!response.ok) throw new Error('Failed to upload');
        
            const { url: videoUrl } = await response.json();
            console.log("File uploaded to Blob Storage:", videoUrl);
        
            setUploadStatus('Video uploaded. Sending for analysis...');
            console.log("Triggered to execute score.py");

            // Send the video URL to the Azure ML analysis endpoint
            const analysisResponse = await fetch('/api/analyzeVideo', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ video_url: videoUrl }),
            });
            
            if (!analysisResponse.ok) throw new Error('Failed to analyze video');

            const analysisResult = await analysisResponse.json();
            console.log("Got result, send them to result page...");

            // Store the result in session storage
            sessionStorage.setItem('analysisResult', JSON.stringify(analysisResult));

            // Delete uploaded video due to limit storage
            await fetch('/api/deletVideo', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl }),
            });
            
            router.push('/results');
        }
        catch (error)
        {
            setUploadStatus('Error during upload or analysis.');
            console.error('Upload/Analysis error:', error);
        }
    };

        // Helper function to convert file to base64
        const fileToBase64 = (file: File): Promise<string> => 
        {
            return new Promise((resolve, reject) =>
            {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => 
                {
                    const result = reader.result as string;
                    // Remove the data URL prefix to get only the base64-encoded string
                    resolve(result.split(',')[1]);
                };
            reader.onerror = (error) => reject(error);
            });
        };
        
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Upload Video for Deepfake Detection</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>
            
            {videoFile && (
                <div>
                    <button onClick={handleUploadToAzure}>Upload and Analyze</button>
                </div>
            )}

            {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        );
}
>>>>>>> 7f74ee0 (Update basic concepts)
