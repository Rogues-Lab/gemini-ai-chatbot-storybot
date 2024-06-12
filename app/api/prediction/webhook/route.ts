
export async function GET() {

    const data = { message: 'Request processed successfully.'};
   
    return Response.json({ data })
  }

// import { Job } from '@/lib/types';
// import { kv } from '@vercel/kv';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { validateWebhook } from "replicate";

// async function getJob(reference: string) {
//     const user = await kv.hgetall<Job>(`job:${reference}`)
//     return user
//   }

// const REPLICATE_WEBHOOK_SECRET = process.env.REPLICATE_WEBHOOK_SECRET || '';
  
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         // Handle GET request
//         const { reference } = req.query;
//         const job = getJob(reference as string);
//         if(job){
//             res.status(200).json(job);
//         } else {
//             res.status(404).json({ message: 'Job not found' });
//         }
//     } else if (req.method === 'POST') {
//         // Handle POST request
//         const { body } = req;
//         console.log("🪝 incoming webhook!", body);

//         const isValid = validateWebhook(req, REPLICATE_WEBHOOK_SECRET);
        
//         if (!isValid) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         // Process the request body
//         const { id, reference } = body;
//         let job = await getJob(reference as string);
        
//         if(job){

//             job.status = 'completed';
//             job.result = body
//             job.resulted = Date.now().toString();
        
//             await kv.hmset(`job:${reference}`, job)
            
//             res.status(200).json(job);
//         } else {
//             res.status(404).json({ message: 'Job not found' });
//         }
//         res.status(200).json({ message: 'Request processed successfully.' });
//     } else {
//         // Handle other request methods
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }
