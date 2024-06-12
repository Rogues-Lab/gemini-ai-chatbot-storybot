import { Job } from '@/lib/types';
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';


async function getJob(reference: string) {
    const user = await kv.hgetall<Job>(`job:${reference}`)
    return user
  }
  
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request
        const { reference } = req.query;
        const job = getJob(reference as string);
        
        if(job){
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request
        const { body } = req;
        // Process the request body
        const { reference } = body;
        const job = getJob(reference as string);
        
        if(job){
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Request processed successfully.' });
    } else {
        // Handle other request methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
