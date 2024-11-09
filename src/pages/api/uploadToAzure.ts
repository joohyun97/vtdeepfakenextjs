import { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if (req.method !== 'POST')
    {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { fileName, fileContentType, fileData } = req.body;

    try
    {
        const blobServiceClient = new BlobServiceClient(
        `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_TOKEN}`
        );
        const containerClient = blobServiceClient.getContainerClient(process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME || '');

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(Buffer.from(fileData, 'base64'), {
        blobHTTPHeaders: { blobContentType: fileContentType },
    });

    res.status(200).json({ message: 'Upload successful', url: blockBlobClient.url });
    }
    catch (error)
    {
        console.error('Error uploading to Azure:', error);
        res.status(500).json({ error: 'Failed to upload to Azure Blob Storage' });
    }
}
