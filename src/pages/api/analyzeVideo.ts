import type { NextApiRequest, NextApiResponse } from 'next';

interface AnalysisResult
{
    total_frames: number;
    deepfake_frames: number;
    deepfake_percentage: number;
    output_video_path: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if (req.method === 'POST')
    {
        const { video_url } = req.body;

        try
        {
            // Send video URL to Azure ML endpoint
            const mlResponse = await fetch(process.env.AZURE_ML_ENDPOINT || '',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.AZURE_ML_API_KEY || ''}`,
                },
                body: JSON.stringify({ video_url }),
            });

            if (!mlResponse.ok)
            {
                // Log the response status and headers for debugging
                const errorText = await mlResponse.text();
                console.error(`Azure ML Response Error: ${mlResponse.status} - ${errorText}`);
                throw new Error(`Azure ML request failed with status ${mlResponse.status}`);
            }
            
            console.log("Azrure ML respoonse OK, now getting result");
            const analysisResult: AnalysisResult = await mlResponse.json();
            console.log("Analysis Result: ", analysisResult);

            res.status(200).json(analysisResult);
        }
        catch (error)
        {
        console.error('Azure ML request error:', error);
        res.status(500).json({ error: 'Error initiating analysis' });
        }
    }
    else 
    {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
