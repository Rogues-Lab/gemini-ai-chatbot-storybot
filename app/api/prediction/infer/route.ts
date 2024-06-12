'use server' 

import { NextApiRequest, NextApiResponse } from 'next';
import { createJob, getAsyncComic, getPrediction } from './replicate';

  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
        // Handle GET request
        const { reference } = req.query;
        // const job = getJob(reference as string);
        const prediction = await getPrediction(reference as string);

        if(prediction){
            res.status(200).json(prediction);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request
        const { body } = req;


        // Process the request body
        const { reference, comic_description, character_description } = body;
        const inferJob = await createJob(reference, comic_description, {character_description: character_description});

        const comic = getAsyncComic(comic_description, character_description);
        console.log('comic', comic);
      
        
        if(inferJob){
            res.status(200).json(inferJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Request processed successfully.' });
    } else {
        // Handle other request methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
