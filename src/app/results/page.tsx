'use client';

import { useEffect, useState } from "react";

interface AnalysisResult
{
    total_frames: number;
    deepfake_frames: number;
    deepfake_percentage: number;
    output_video_path: string;
}

export default function Results()
{
    const [result, setResult] = useState<AnalysisResult | null>(null);

    useEffect(() =>
    {
        const storedResult = sessionStorage.getItem('analysisResult');
        if (storedResult) setResult(JSON.parse(storedResult));
        else console.error("No analysis result found.");
    }, []);

    return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Analysis Results</h1>
        
        {result ? (
            <div>
                <p><strong>Total Frames:</strong> {result.total_frames}</p>
                <p><strong>Deepfake Frames:</strong> {result.deepfake_frames}</p>
                <p><strong>Deepfake Percentage:</strong> {result.deepfake_percentage.toFixed(2)}%</p>
            <div style={{ marginTop: '20px' }}>
                <a href={result.output_video_path} download>
                    <button>Download Processed Video</button>
                </a>
            </div>
        </div>
        ) : (
            <p>Loading results...</p>
        )}
        </div>
    );
}