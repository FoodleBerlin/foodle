import aws from 'aws-sdk';
import { AuthenticatedProps } from '../account/payments';
export const s3 = new aws.S3({
  accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_APP_AWS_REGION,
})

export const uploadResource = async (file: File | null, filename: string) => {
  const res = await fetch(`/api/uploadImage?file=${filename}`);
  const data = await res.json();
  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]: any) => {
    formData.append(key, value);
  });
  await fetch(data.url, {
    method: 'POST',
    body: formData,
  });
  return await data;
}

export default async function handler(req: any, res: any, props: AuthenticatedProps) {
  try {
    s3.listObjectsV2({ Bucket: 'foodle-bucket' }, async (err, data) => {
      if (data.Contents!.length < 100) {
        try {
          const post = s3.createPresignedPost({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
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
          res.status(500).json({ error: error })
        }
      } else {
        return res.status(400).json({ message: "Too many objects in bucket" })
      }
      if (err) {
        return res.status(500).json({ awsError: err })
      }
    })
  }
  catch (error) {
    return res.status(500).json({ error2: error })
  }
}