'use server' 
import { getAsyncComic, getPrediction } from './replicate';

export async function GET(req: Request) {

  const url = new URL(req.url as string);
  const reference = url.searchParams.get('reference');
  console.log('reference', reference);
  
  if(!reference){
    return Response.json('Reference is required', { status: 500 });
  }
  const prediction = await getPrediction(reference as string);
 
  return Response.json({ prediction })
}

export async function POST(req: Request) {
  const { comic_description, character_description } = await req.json()

    
  if(!comic_description || !character_description){
    return Response.json('comic_description and character_description is required', { status: 500 });
  }

  const comic = await getAsyncComic(comic_description, character_description);
  console.log('comic', comic);
  return Response.json({ comic })
}