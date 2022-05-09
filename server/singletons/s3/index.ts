import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
  signatureVersion: 'v4',
})


export type EndpointRes<T> =
  | {
      response: {
        success: {
          body: T;
        };
        failure: null;
      };
    }
  | {
      response: {
        success: null;
        failure: {
          message: string;
          type: unknown;
        };
      };
    };

export abstract class AWSWrapperAbstract {
  constructor(protected awsAccessKey: string, protected secretAccessKey: string, region:string) {}
  /** Assigned in the constructor */
  abstract awsS3: aws.S3;
  abstract getSignedUrl: (params: {userId: string, s3Id: string})=>Promise<EndpointRes<string>>
  abstract uploadResource: (params: {file: File, s3Id: string})=>Promise<EndpointRes<string>>
  abstract deleteResource: (params: { s3Id: string})=>Promise<EndpointRes<string>>
}
// APP_AWS_REGION = 'eu-central-1'
// AWS_S3_BUCKET_NAME = 'foodle-bucket'
class AWSWrapper extends AWSWrapperAbstract{
  awsS3: aws.S3;
  constructor () {
    super (process.env.APP_AWS_ACCESS_KEY!, process.env.APP_AWS_SECRET_KEY!, process.env.APP_AWS_REGION!)
    const awsS3 = new aws.S3({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
    })
    this.awsS3 = awsS3;
  }
  getSignedUrl=  async (params: { s3Id: string; }) => {
    let res: EndpointRes<string>;
    try {
      const signedUrl = await this.awsS3.getSignedUrl('getObject', {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: params.s3Id,
      });
      res = {
        response: {
          failure:null,
          success: {
            body: signedUrl,
          }
        }
      }
    } catch (e){
      res = {
        response: {
          failure: {
            // ...createApiError(e),
            message: e as string,
            type: "failure" as "unknown",
          },
          success: null,
        },
      };
    }
    return res;
  };
  uploadResource= async (params: { file: File, s3Id: string }) => {
    let res: EndpointRes<string>;
    try {
      const post = await this.awsS3.createPresignedPost({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Fields: {
            key: params.s3Id,
          },
          Expires: 60, // seconds
          Conditions: [
            ['content-length-range', 0, 5048576], // up to 1 MB
          ],
        })
      const formData = new FormData();
      const file = params.file;
      Object.entries({ ...post.fields, file }).forEach(([key, value]: any) => {
        formData.append(key, value);
      });
      await fetch(post.url, {
        method: 'POST',
        body: formData,
      });
      res = {
        response: {
          failure:null,
          success: {
            body: "Successfully Uploaded",
          }
        }
      }
    } catch (e){
      res = {
        response: {
          failure: {
            // ...createApiError(e),
            message: e as string,
            type: "failure" as "unknown",
          },
          success: null,
        },
      };
    }
    return res;
  };
  deleteResource= async (params: {s3Id: string }) => {
    let res: EndpointRes<string>;
    try {
      this.awsS3.deleteObject({
        Bucket: 'foodle-bucket',
        Key: params.s3Id,
      })
      res = {
          response: {
            failure:null,
            success: {
              body: "Successfully Deleted",
            }
          }
        }
      } catch (e){
      res = {
        response: {
          failure: {
            // ...createApiError(e),
            message: e as string,
            type: "failure" as "unknown",
          },
          success: null,
        },
      };
    }
    return res;
  };


}
export default AWSWrapper;
// deleteResource= async (params: {s3Id: string }) => {
//     let res: EndpointRes<string>;
//     try {
//       s3.deleteObject({
//         Bucket: 'foodle-bucket',
//         Key: params.s3Id,
//       }, (err, data) => {
//       if (data) {
//         return res = {
//           response: {
//             failure:null,
//             success: {
//               body: "Successfully Uploaded",
//             }
//           }
//         }
//       }
//       else {
//         return res = {
//           response: {
//             failure: {
//               // ...createApiError(e),
//               message: err.message,
//               type: err.code,
//             },
//             success: null,
//           },
//         };
//       }
//     })
//    } catch (e){
//       return res = {
//         response: {
//           failure: {
//             // ...createApiError(e),
//             message: e as string,
//             type: "failure" as "unknown",
//           },
//           success: null,
//         },
//       };
//     }
//   };



