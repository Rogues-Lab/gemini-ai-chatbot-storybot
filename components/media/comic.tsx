
'use client'
import { use, useEffect, useState } from 'react';
import { SpinnerIcon } from '../ui/icons'
import Replicate from "replicate";
const replicate = new Replicate(
  {auth: process.env.REPLICATE_API_KEY}
);



export const Comic = ({ args, isLoading }: {args :any,  isLoading: boolean }) => {
    console.log('Comic', args, isLoading);

  const getComic = async (comic_description: string) => {
    const output = await replicate.run(
      "hvision-nku/storydiffusion:39c85f153f00e4e9328cb3035b94559a8ec66170eb4c0618c07b16528bf20ac2",
      {
        input: {
          num_ids: 3,
          sd_model: "Unstable",
          num_steps: 25,
          style_name: "Japanese Anime",
          comic_style: "Classic Comic Style",
          image_width: 768,
          image_height: 768,
          sa32_setting: 0.5,
          sa64_setting: 0.5,
          output_format: "jpg",
          guidance_scale: 5,
          output_quality: 80,
          negative_prompt: "bad anatomy, bad hands, missing fingers, extra fingers, three hands, three legs, bad arms, missing legs, missing arms, poorly drawn face, bad face, fused face, cloned face, three crus, fused feet, fused thigh, extra crus, ugly fingers, horn, cartoon, cg, 3d, unreal, animate, amputation, disconnected limbs",
          comic_description: comic_description,
          style_strength_ratio: 20,
          character_description: "a blonde girl img, wearing a plain white shirt"
        }
      }
    );
    console.log(output);
    setComic(output);
    return output;
  }

  const [comic, setComic] = useState<any>(null);

  useEffect(() => {
    getComic(args?.comicGenerationPrompt);
  }, [args?.comicGenerationPrompt]);

  return (
    <div className="flex flex-col gap-2">
         {!comic && 
          <div className="flex flex-row items-center">
            <div className="text-zinc-500 text-sm">Comic generation is in progress...</div>
            <div
              className={`flex flex-row  items-center ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            >
              <SpinnerIcon />

            <div className="text-zinc-500 text-sm">Comic... ${args?.comicGenerationPrompt}</div>
          </div>
          </div>
         }

         {comic &&
            <div className="flex flex-row items-center">
              <div className="text-zinc-500 text-sm">Comic generation is in done...</div>
       
                <img src={comic.output} alt="comic" className="w-32 h-32" />

                <div className="text-zinc-500 text-sm">Comic... ${args?.comicGenerationPrompt}</div>

            </div>
          }
    </div>
  )
}
