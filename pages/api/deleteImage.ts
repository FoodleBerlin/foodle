import {s3} from './upload-image'
import type { GetServerSidePropsContext} from 'next'
export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (!req.cookies['jwt']) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
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


  