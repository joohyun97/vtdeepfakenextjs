import type { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if(req.method !== 'POST')
    {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method ${req.method Not Allowed}');
        return;
    }

    const { videoUrl } = req.body;

    if(!videoUrl)
    {
        res.status(400).json({ error: 'Missing video URL' });
        return;
    }

    try
    {
        // Initialize Blob Service Client
        const blobServiceClient = new BlobServiceClient(
        `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN}`
        );
        const containerClient = blobServiceClient.getContainerClient(process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME || '');
    
        // Extract the blob name from the URL
        const blobName = new URL(videoUrl).pathname.split('/').pop();
        if (!blobName) throw new Error('Invalid blob name');
    
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
        // Delete the blob if it exists
        await blockBlobClient.deleteIfExists();
    
        res.status(200).json({ message: 'Video deleted successfully' });
    }
    catch (error)
    {
        console.error('Error deleting video:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
}