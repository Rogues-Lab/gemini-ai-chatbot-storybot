import { Job } from '@/lib/types';
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import Replicate from "replicate";
const replicate = new Replicate(
  {auth: process.env.REPLICATE_API_KEY}
);


export async function getJob(reference: string) {
    const user = await kv.hgetall<Job>(`job:${reference}`)
    return user
  }

  export async function createJob(
    reference: string,
    prompt: string,
    promptArgs: any
  ) {
    const existingJob = await getJob(reference)
  
    if (existingJob) {
      return {
        type: 'error',
        resultCode: ResultCode.JobAlreadyExists
      }
    } else {

      const job = {
        reference: crypto.randomUUID(),
        prompt,
        promptArgs,
        result: {},
        creation: Date.now().toString(),
        status: 'new    '
      }
  
      await kv.hmset(`job:${reference}`, job)
  
      return {
        type: 'success',
        resultCode: ResultCode.JobCreated
      }
    }
  }
  

export const getSyncComic = async (comic_description: string) => {
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
  return output;
}

export const getWebhookComic = async (comic_description: string, character_description: string) => {
  const callbackURL = `https://storybots.xyz/api/prediction/webhook`;

  const output = await replicate.predictions.create({
    model: "hvision-nku/storydiffusion",
    version: "39c85f153f00e4e9328cb3035b94559a8ec66170eb4c0618c07b16528bf20ac2",
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
        character_description: character_description
      },
      webhook: callbackURL,
      webhook_events_filter: ["completed"],
    },
  );
  console.log("replicate.predictions.create(", output);
  return output;
}


export const getAsyncComic = async (comic_description: string, character_description: string) => {


  const output = await replicate.predictions.create({
    model: "hvision-nku/storydiffusion",
    version: "39c85f153f00e4e9328cb3035b94559a8ec66170eb4c0618c07b16528bf20ac2",
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
        character_description: character_description
      }
    },
  );
  console.log("replicate.predictions.create", output);
  return output;
}


export const getPrediction = async (reference: string) => {

  return await replicate.predictions.get(reference as string);
}