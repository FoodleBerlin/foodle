import aws from 'aws-sdk'
import { GetServerSidePropsContext } from 'next';
import { AuthenticatedProps } from '../account/payments';
import { getServerSideProps } from '../create';
// EXAMPLE USAGE
// const file = e?.target?.files ? e?.target?.files[0] : null;
// const filename = encodeURIComponent(file ? file.name : '');
// await uploadResource(file, filename);
export const s3 = new aws.S3({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
})

export const uploadResource= async (file:File | null, filename: string)=>{
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
    const post = await s3.createPresignedPost({
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
}