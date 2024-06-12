'use client'
import { use, useEffect, useState } from 'react';
import { SpinnerIcon } from '../ui/icons'
import { getAsyncComic, getPrediction } from '../../app/api/prediction/infer/replicate';


export const Comic = ({characterDescription, comicGenerationPrompt }: {characterDescription :string,  comicGenerationPrompt: string }) => {
  console.log('Comic component', characterDescription, comicGenerationPrompt);

  const [comic, setComic] = useState<any>(null);
  const [replicateJob, setReplicateJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    const generateComic = async () => {
      try {
        const predictionJob = await getAsyncComic(comicGenerationPrompt, characterDescription);
        await setReplicateJob(predictionJob);
        console.log('replicateJob', predictionJob);
        await pollPrediction(predictionJob?.id);
      } catch (error) {
        console.error('Error generating comic', error);
      }
    }
    generateComic();

  }, [comicGenerationPrompt, characterDescription]);

  const pollPrediction = async (reference: string) => {

    setLoading(true);
    const prediction = await getPrediction(reference);
    console.log('pollPrediction', prediction);
    if (prediction?.output?.comic) {
      setComic(prediction?.output?.comic);
      setLoading(false);
    } else if (prediction?.error) {
      setLoading(false);
      console.error('Error generating comic', prediction.error);
    } else {
      setTimeout(() => pollPrediction(reference), 2000);
    }
  }

  return (
    <div className="flex flex-col gap-2">
         {!comic && 
          <div className="flex flex-col items-center text-black">
            <div className="text-black text-sm">Comic generation is in progress...</div>
              <div
                className={`flex flex-row  items-center ${loading ? 'opacity-100' : 'opacity-0'}`}
              >
                <SpinnerIcon />
                

            </div>
            <div className="flex flex-col items-center">
              <div className="text-black text-sm">characterDescription... {characterDescription}</div>
              <div className="text-black text-sm">comicGenerationPrompt... {comicGenerationPrompt}</div>
              <div className="text-black text-sm">comic... {comic}</div>
              <div className="text-black text-sm">isLoading... {loading == true ? 'true' : 'false'}</div>
              <div className="text-black text-sm">replicateJob... {replicateJob}</div>
            </div>
          </div>
         }

         {comic &&
            <div className="flex flex-row items-center">
              <div className="text-black text-sm">Comic generation is in done...</div>
       
                <img src={comic.output} alt="comic" className="w-32 h-32" />

                <div className="text-black text-sm">Comic... ${comicGenerationPrompt}</div>

            </div>
          }
    </div>
  )
}
