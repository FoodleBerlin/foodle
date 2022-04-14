import aws, {Response} from 'aws-sdk';
import { unknown } from 'zod';
import { EndpointResponse } from '../stripe/endpoints';


// export const listAll = async()=>{
//   console.log("getting here");
//   const response = await s3.listObjectsV2(
//     // {
//     //   Bucket:'foodle-bucket' 
//     // }
//   ).promise();
//   console.log({response})
// }

// Creates S3 client
export const s3 = new aws.S3({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      
      region: process.env.APP_AWS_REGION,
    })
     // 2. 
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
      s3.deleteObject({
        Bucket: 'foodle-bucket',
        Key: params.s3Id,
      }, (err, data) => {
      if (data) {
        return res = {
          response: {
            failure:null,
            success: {
              body: "Successfully Uploaded",
            }
          }
        }
      }
      else {
        // return res = {
        //   response: {
        //     failure: {
        //       // ...createApiError(e),
        //       message: err.message,
        //       type: err.code,
        //     },
        //     success: null,
        //   },
        // };
      }
    })
   } catch (e){
      // return res = {
      //   response: {
      //     failure: {
      //       // ...createApiError(e),
      //       message: e as string,
      //       type: "failure" as "unknown",
      //     },
      //     success: null,
      //   },
      // };
    }
  };


}


//   getCustomerCharges = async (params: { customerId: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.Charge>>>;
//     try {
//       const charges = await this.stripe.charges.list({ customer: params.customerId });
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: charges,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           failure: {
//             ...createApiError(e),
//           },
//           success: null,
//         },
//       };
//     }
//     return res;
//   };
//   getCustomer = async (params: { customerId: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
//     try {
//       const customer = await this.stripe.customers.retrieve(params.customerId);
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: customer,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           failure: { 
//             ...createApiError(e)
//           },
//           success: null,
//         },
//       };
//     }
//     return res;
//   };
//   getCustomerPaymentMethods = async (params: { customerId: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
//     try {
//       const paymentMethod = await this.stripe.paymentMethods.list({ type: 'card', customer: params.customerId });
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: paymentMethod,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           failure: {
//             ...createApiError(e),
//           },
//           success: null,
//         },
//       };
//     }
//     return res;
//   };
//   // TODO set payment method as default
//   // TODO fetch customer.invoice_settings.default payment method
//   /** Payment method needs to be created in the front end first */
//   attachPaymentMethodToCustomer = async (params: { customerId: string; paymentMethodId: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.PaymentMethod>>;
//     try {
//       const paymentMethod = await this.stripe.paymentMethods.attach(
//         params.paymentMethodId, // <-- your payment method ID collected via Stripe.js
//         { customer: params.customerId } // <-- your customer id from the request body
//       );
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: paymentMethod,
//           },
//         },
//       };
//       // customer.update({invoice_settings: { default_payment_method: paymentMethod.id }})
//     } catch (e) {
//       res = {
//         response: {
//           success: null,
//           failure: {
//             ...createApiError(e),
//           },
//         },
//       };
//     }
//     return res;
//   };
//   listProducts = async () => {
//     let res: EndpointResponse<Array<Stripe.Price & { productData: Stripe.Product }>>;
//     try {
//       const prices = await this.stripe.prices.list();
//       const pricesFormatted: (Stripe.Price & {
//         productData: Stripe.Product;
//       })[] = await Promise.all(
//         prices.data.map(async (price, i) => {
//           const productId = price.product as string;
//           const product = await this.stripe.products.retrieve(productId);
//           // Add product details to query
//           return { ...price, productData: product };
//         })
//       );
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: pricesFormatted,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           success: null,
//           failure: {
//             ...createApiError(e),
//           },
//         },
//       };
//     }
//     return res;
//   };
//   createInvoice = async (params: { invoiceId: string; customerId: string; payment_method_id: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.Invoice>>;
//     try {
//       const invoice = await this.stripe.invoices.create({
//         customer: params.customerId,
//         auto_advance: true, // Auto finalize this drafter after 1 hour
//         collection_method: 'charge_automatically',
//         metadata: {
//           pick_up: 'saturday',
//         },
//         default_payment_method: params.payment_method_id,
//       });
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: invoice,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           success: null,
//           failure: {
//             ...createApiError(e),
//           },
//         },
//       };
//     }
//     return res;
//   };
//   createInvoiceItem = async (params: { customer: string; price: string; quantity: number }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.InvoiceItem>>;
//     try {
//       const invoiceItem = await this.stripe.invoiceItems.create(
//         {
//           ...params,
//           currency: 'eur',
//           description: 'booking in industrial kitchen mitte',
//         },
//         {
//           stripeAccount: this.stripeAccountKey,
//         }
//       );
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: invoiceItem,
//           },
//         },
//       };
//       return res;
//     } catch (e) {
//       res = {
//         response: {
//           success: null,
//           failure: {
//             ...createApiError(e),
//           },
//         },
//       };
//       return res;
//     }
//   };
//   payInvoice = async (params: { invoiceId: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.Invoice>>;
//     try {
//       const invoice = await this.stripe.invoices.pay(params.invoiceId);
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: invoice,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           failure: {
//             ...createApiError(e),
//           },
//           success: null,
//         },
//       };
//     }
//     return res;
//   };
//   createCustomer = async (params: { email: string }) => {
//     let res: EndpointResponse<Stripe.Response<Stripe.Customer>>;
//     try {
//       const customer = await this.stripe.customers.create({
//         ...params,
//       });
//       res = {
//         response: {
//           failure: null,
//           success: {
//             body: customer,
//           },
//         },
//       };
//     } catch (e) {
//       res = {
//         response: {
//           success: null,
//           failure: {
//             ...createApiError(e),
//           },
//         },
//       };
//     }
//     return res;
//   };
// }

// const createApiError: (e: unknown) => {
//   type: Stripe.StripeError['type'] | 'unknown';
//   message:string;
// } = function (e) {
//   return {
//     type:  'unknown',
//     message: e as string,
//   };
// };

// export default StripeWrapper;

