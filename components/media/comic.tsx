'use client'
import { use, useEffect, useState } from 'react'
import { SpinnerIcon } from '../ui/icons'
import { Button } from '../ui/button'
import { set } from 'date-fns'

export const Comic = ({
  characterDescription,
  comicGenerationPrompt
}: {
  characterDescription: string
  comicGenerationPrompt: string
}) => {
  const [editableCharacterDescription, setEditableCharacterDescription] =
    useState(characterDescription)
  const [editableComicGenerationPrompt, setEditableComicGenerationPrompt] =
    useState(comicGenerationPrompt)
  const [comic, setComic] = useState<any>(null)
  const [prediction, setPrediction] = useState<any>(null)
  const [replicateJob, setReplicateJob] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setEditableCharacterDescription(characterDescription)
    setEditableComicGenerationPrompt(comicGenerationPrompt)
    setComic(null)
    setPrediction(null)
    setReplicateJob(null)
    setLoading(false)
  }, [characterDescription, comicGenerationPrompt])



  const generateComic = async () => {
    try {
      const api_post_url = '/api/prediction/infer/'
      const response = await fetch(api_post_url, {
        method: 'POST',
        body: JSON.stringify({
          comic_description: editableComicGenerationPrompt,
          character_description: editableCharacterDescription
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log('data', data)

      if (data?.comic) {
        await setLoading(true)
        await setComic(data.comic)
        await setReplicateJob(data.comic.id)
        await setPrediction(null);
        console.log('setReplicateJob', data.comic.id)
        await setLoading(false)
        // setTimeout(() => checkProgress(), 5000)
      } else if (data?.error) {
        await setLoading(false)
        console.error('Error generating comic', data.error)
      }
    } catch (error) {
      console.error('Error generating comic', error)
    }
  }


  const checkProgress = async () => {
    setLoading(true)
    console.log('replicateJob', replicateJob)
    const api_get_url = '/api/prediction/infer?reference=' + replicateJob
    const response = await fetch(api_get_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('poll data', data);
    if (data?.prediction?.status === "succeeded" || data?.prediction?.status === "failed") {
     await setReplicateJob(null)
    }
    await setPrediction(data.prediction)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center text-black">
        

<div className="flex flex-col w-full">
  <div className="w-full mt-2">
    <label htmlFor="characterDescription" className="block text-sm font-medium text-gray-700">
      Character Description:
    </label>
    <textarea
      id="characterDescription"
      name="characterDescription"
      rows={5}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
      value={editableCharacterDescription}
      onChange={e => setEditableCharacterDescription(e.target.value)}
    />
  </div>
  <div className="w-full my-2">
    <label htmlFor="comicGenerationPrompt" className="block text-sm font-medium text-gray-700">
      Comic Generation Prompt:
    </label>
    <textarea
      id="comicGenerationPrompt"
      name="comicGenerationPrompt"
      rows={9}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
      value={editableComicGenerationPrompt}
      onChange={e => setEditableComicGenerationPrompt(e.target.value)}
    />
  </div>

  <div className="text-black text-sm">
    replicateJob... {replicateJob}
  </div>
  {prediction && <div className="text-black text-sm">
    prediction... {(prediction?.status)}
  </div>}
  {!replicateJob && <Button onClick={generateComic} className="mt-2 bg-blue-700 text-white">
    Generate Comic
  </Button>}

  {replicateJob &&<Button onClick={checkProgress} className="mt-2 bg-gray-700 text-white">
    Check Progress Comic
  </Button>}
</div>

      {loading && (
           <div className="my-2">
            <div className="text-black text-sm">
              Checking...
            </div>
            <div
              className={`flex flex-row  items-center ${loading ? 'opacity-100' : 'opacity-0'}`}
            >
              <SpinnerIcon />
            </div>
          </div>
        )}

      {/* {!loading && !prediction?.output?.comic &&  !replicateJob && (
        <div className="my-2">

          <div className="text-black text-sm">Comic is generating...</div>
          <div
              className={`flex flex-row  items-center ${loading ? 'opacity-100' : 'opacity-0'}`}
            >
              <SpinnerIcon />
            </div>
          </div>
      )} */}

      {prediction?.output?.comic && (
        <div className="flex flex-row items-center">
          <img src={prediction.output?.comic} alt="comic" width={500} height={500} />
        </div>
      )}

      {prediction?.error && (
        <div className="flex flex-row items-center text-red-500">
         {prediction?.error}
        </div>
      )}


    </div>
    </div>
  )
}
