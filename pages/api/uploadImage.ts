
import { AuthenticatedProps } from '../account/payments';
import {s3} from '../../utils/s3ResourceHandlers'

export default async function handler(req: any, res: any, props: AuthenticatedProps) {
  s3.listObjectsV2({Bucket: 'foodle-bucket'}, async (err, data)=> {
    if (data.Contents!.length<100) {
      try { 
        console.log("gettin 'ere")
        const post = s3.createPresignedPost({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Fields: {
            key: req.query.file,
          },
          Expires: 60, // seconds
          Conditions: [
            ['content-length-range', 0, 5048576], // up to 1 MB
          ],
        })
        return res.status(200).json(post)
      } catch (error) {
        console.log(error)
      }
    } else {
      return res.status(400).json({message: "Too many objects in bucket"})
    }
  })
  
  
}