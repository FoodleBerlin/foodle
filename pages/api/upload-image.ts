import aws from 'aws-sdk'
import { GetServerSidePropsContext } from 'next';
// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   if (!req.cookies['jwt']) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }
// }
export const s3 = new aws.S3({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
})

export const uploadResource= async (file:File | null)=>{
  const filename = encodeURIComponent(file ? file.name : '');
  const res = await fetch(`/api/upload-image?file=${filename}`);
  return await res.json();
}

export default async function handler(req: any, res: any) {
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