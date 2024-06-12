'use client'
import { use, useEffect, useState } from 'react'
import { SpinnerIcon } from '../ui/icons'
import { Button } from '../ui/button'

export const Comic = ({
  characterDescription,
  comicGenerationPrompt
}: {
  characterDescription: string
  comicGenerationPrompt: string
}) => {
  console.log('Comic component', characterDescription, comicGenerationPrompt)

  const [editableCharacterDescription, setEditableCharacterDescription] =
    useState(characterDescription)
  const [editableComicGenerationPrompt, setEditableComicGenerationPrompt] =
    useState(comicGenerationPrompt)

  useEffect(() => {
    setEditableCharacterDescription(characterDescription)
    setEditableComicGenerationPrompt(comicGenerationPrompt)
    setComic(null)
    setReplicateJob(null)
    setLoading(false)
  }, [characterDescription, comicGenerationPrompt])

  const [comic, setComic] = useState<any>(null)
  const [replicateJob, setReplicateJob] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const generateComic = async () => {
    try {
      const api_post_url = '/api/prediction/infer/'
      const response = await fetch(api_post_url, {
        method: 'POST',
        body: JSON.stringify({
          comic_description: editableCharacterDescription,
          character_description: editableComicGenerationPrompt
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log('data', data)

      if (data?.comic) {
        setLoading(true)
        setComic(data.comic)
        setReplicateJob(data.comic.id)
        setLoading(false)
        setTimeout(() => pollPrediction(replicateJob), 2000)
      } else if (data?.error) {
        setLoading(false)
        console.error('Error generating comic', data.error)
      } else {
        setTimeout(() => pollPrediction(replicateJob), 2000)
      }
    } catch (error) {
      console.error('Error generating comic', error)
    }
  }

  const pollPrediction = async (reference: string) => {
    setLoading(true)

    const api_get_url = '/api/prediction/infer/reference=' + reference
    const response = await fetch(api_get_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('poll data', data);

    if (data?.prediction?.status === 'done') {
      setLoading(false)
      setComic(data.comic)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center text-black">
        {loading && (
          <>
            <div className="text-black text-sm">
              Comic generation is in progress...
            </div>
            <div
              className={`flex flex-row  items-center ${loading ? 'opacity-100' : 'opacity-0'}`}
            >
              <SpinnerIcon />
            </div>
          </>
        )}
        <div className="flex flex-col items-center">
          <div className="text-black text-sm">
            characterDescription:
            <input
              type="text"
              value={characterDescription}
              onChange={e => setEditableCharacterDescription(e.target.value)}
            />
          </div>
          <div className="text-black text-sm">
            comicGenerationPrompt:
            <input
              type="text"
              value={comicGenerationPrompt}
              onChange={e => setEditableComicGenerationPrompt(e.target.value)}
            />
          </div>
          <div className="text-black text-sm">
            isLoading... {loading == true ? 'true' : 'false'}
          </div>
          <div className="text-black text-sm">
            replicateJob... {replicateJob}
          </div>
        </div>
        <Button onClick={generateComic} className="mt-2 bg-blue-700 text-white">
          Generate Comic
        </Button>
      </div>

      {comic && (
        <div className="flex flex-row items-center">
          <div className="text-black text-sm">Comic generation is done...</div>

          <img src={comic.output?.comic} alt="comic" width={500} height={500} />
        </div>
      )}
    </div>
  )
}
