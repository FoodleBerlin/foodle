
import {s3} from './uploadImage'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

// Example Usage:
// const filename = ref.current?.files ? ref.current?.files[0].name : '';
//deleteResource(filename);
export const deleteResource = async(filename:string)=>{
    const res = await fetch(`/api/deleteImage?file=${filename}`);
    const data = await res.json();
    console.log('deida:' + JSON.stringify(data));
}
export default async function handler(req: any, res: any) {
  try {
    s3.deleteObject({
        Bucket: 'foodle-bucket',
        Key: req.query.file,
    }, (err, data) => {
    if (err) {
      return res.status(200).json({message:"failure"}); 
    }
    else {
      return res.status(200).json({message:"success"}); 
    }
   ;})
  } catch (error) {
    console.log(error)
  }
}


  