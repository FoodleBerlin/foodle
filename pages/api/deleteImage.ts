

import {s3} from '../../utils/s3ResourceHandlers'

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
   return res.status(200).json({message:"success"});
  } catch (error) {
    console.log(error)
  }
}


  