// 'use server' 
export async function GET() {

  const data = { message: 'Request processed successfully.'};
 
  return Response.json({ data })
}

// import { type NextRequest } from 'next/server'
// import { createJob, getAsyncComic, getPrediction } from './replicate';

  
// export async function GET(request: Request) {
//         const { searchParams } = new URL(request.url)
//         const reference = searchParams.get('reference')

//         // const job = getJob(reference as string);
//         const prediction = await getPrediction(reference as string);
//         let res = Response
//         if(prediction){
//             res.json(prediction);
//         } else {
//             res.json({ message: 'Job not found' });
//         }

//     return res;
//     // } else if (req.method === 'POST') {
//     //     // Handle POST request
//     //     const { body } = req;


//     //     // Process the request body
//     //     const { reference, comic_description, character_description } = body;
//     //     const inferJob = await createJob(reference, comic_description, {character_description: character_description});

//     //     const comic = await getAsyncComic(comic_description, character_description);
//     //     console.log('comic', comic);
      
        
//     //     if(inferJob){
//     //         res.status(200).json(inferJob);
//     //     } else {
//     //         res.status(404).json({ message: 'Job not found' });
//     //     }
//     //     res.status(200).json({ message: 'Request processed successfully.' });
//     // } else {
//         // Handle other request methods
//         // res.status(405).json({ message: 'Method Not Allowed' });
//     // }
// }
