import Stripe from 'stripe';
export type EndpointResponse<T> =
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
          message: Stripe.StripeError['message'] | 'unknown';
          type: Stripe.StripeError['type'] | 'unknown';
        };
      };
    };

export abstract class StripeWrapperAbstract {
  constructor(protected stripeAccountKey: string, protected publishableKey: string) {}
  /** Assigned in the constructor */
  abstract stripe: Stripe;
  abstract createCustomer: (params: { email: string }) => Promise<EndpointResponse<Stripe.Response<Stripe.Customer>>>;
  abstract getCustomer: (params: {
    customerId: string;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>>;
  abstract getCustomerPaymentMethods: (params: {
    customerId: string;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>>;
  abstract createInvoiceItem: (params: {
    customer: string;
    price: string;
    quantity: number;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.InvoiceItem>>>;
  abstract getCustomerCharges: (params: {
    customerId: string;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.Charge>>>>;
  abstract attachPaymentMethodToCustomer: (params: {
    customerId: string;
    paymentMethodId: string;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.PaymentMethod>>>;
  abstract payInvoice: (params: { invoiceId: string }) => Promise<EndpointResponse<Stripe.Response<Stripe.Invoice>>>;
  abstract createInvoice: (params: {
    invoiceId: string;
    customerId: string;
    payment_method_id: string;
  }) => Promise<EndpointResponse<Stripe.Response<Stripe.Invoice>>>;
  abstract listProducts: () => Promise<EndpointResponse<Array<Stripe.Price & { productData: Stripe.Product }>>>;
}

class StripeWrapper extends StripeWrapperAbstract {
  stripe: Stripe;
  constructor() {
    super(process.env.STRIPE_ACCOUNT_ID!, process.env.STRIPE_PUBLISHABLE_KEY!);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2020-08-27',
      appInfo: {
        name: 'fixed-payments',
        version: '0.0.2',
      },
      typescript: true,
    });
    this.stripe = stripe;
  }
  getCustomerCharges = async (params: { customerId: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.Charge>>>;
    try {
      const charges = await this.stripe.charges.list({ customer: params.customerId });
      res = {
        response: {
          failure: null,
          success: {
            body: charges,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          failure: {
            ...createApiError(e),
          },
          success: null,
        },
      };
    }
    return res;
  };
  getCustomer = async (params: { customerId: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;
    try {
      const customer = await this.stripe.customers.retrieve(params.customerId);
      res = {
        response: {
          failure: null,
          success: {
            body: customer,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          failure: {
            ...createApiError(e),
          },
          success: null,
        },
      };
    }
    return res;
  };
  getCustomerPaymentMethods = async (params: { customerId: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    try {
      const paymentMethod = await this.stripe.paymentMethods.list({ type: 'card', customer: params.customerId });
      res = {
        response: {
          failure: null,
          success: {
            body: paymentMethod,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          failure: {
            ...createApiError(e),
          },
          success: null,
        },
      };
    }
    return res;
  };
  // TODO set payment method as default
  // TODO fetch customer.invoice_settings.default payment method
  /** Payment method needs to be created in the front end first */
  attachPaymentMethodToCustomer = async (params: { customerId: string; paymentMethodId: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.PaymentMethod>>;
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(
        params.paymentMethodId, // <-- your payment method ID collected via Stripe.js
        { customer: params.customerId } // <-- your customer id from the request body
      );
      res = {
        response: {
          failure: null,
          success: {
            body: paymentMethod,
          },
        },
      };
      // customer.update({invoice_settings: { default_payment_method: paymentMethod.id }})
    } catch (e) {
      res = {
        response: {
          success: null,
          failure: {
            ...createApiError(e),
          },
        },
      };
    }
    return res;
  };
  listProducts = async () => {
    let res: EndpointResponse<Array<Stripe.Price & { productData: Stripe.Product }>>;
    try {
      const prices = await this.stripe.prices.list();
      const pricesFormatted: (Stripe.Price & {
        productData: Stripe.Product;
      })[] = await Promise.all(
        prices.data.map(async (price, i) => {
          const productId = price.product as string;
          const product = await this.stripe.products.retrieve(productId);
          // Add product details to query
          return { ...price, productData: product };
        })
      );
      res = {
        response: {
          failure: null,
          success: {
            body: pricesFormatted,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          success: null,
          failure: {
            ...createApiError(e),
          },
        },
      };
    }
    return res;
  };
  createInvoice = async (params: { invoiceId: string; customerId: string; payment_method_id: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.Invoice>>;
    try {
      const invoice = await this.stripe.invoices.create({
        customer: params.customerId,
        auto_advance: true, // Auto finalize this drafter after 1 hour
        collection_method: 'charge_automatically',
        metadata: {
          pick_up: 'saturday',
        },
        default_payment_method: params.payment_method_id,
      });
      res = {
        response: {
          failure: null,
          success: {
            body: invoice,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          success: null,
          failure: {
            ...createApiError(e),
          },
        },
      };
    }
    return res;
  };
  createInvoiceItem = async (params: { customer: string; price: string; quantity: number }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.InvoiceItem>>;
    try {
      const invoiceItem = await this.stripe.invoiceItems.create(
        {
          ...params,
          currency: 'eur',
          description: 'booking in industrial kitchen mitte',
        },
        {
          stripeAccount: this.stripeAccountKey,
        }
      );
      res = {
        response: {
          failure: null,
          success: {
            body: invoiceItem,
          },
        },
      };
      return res;
    } catch (e) {
      res = {
        response: {
          success: null,
          failure: {
            ...createApiError(e),
          },
        },
      };
      return res;
    }
  };
  payInvoice = async (params: { invoiceId: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.Invoice>>;
    try {
      const invoice = await this.stripe.invoices.pay(params.invoiceId);
      res = {
        response: {
          failure: null,
          success: {
            body: invoice,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          failure: {
            ...createApiError(e),
          },
          success: null,
        },
      };
    }
    return res;
  };
  createCustomer = async (params: { email: string }) => {
    let res: EndpointResponse<Stripe.Response<Stripe.Customer>>;
    try {
      const customer = await this.stripe.customers.create({
        ...params,
      });
      res = {
        response: {
          failure: null,
          success: {
            body: customer,
          },
        },
      };
    } catch (e) {
      res = {
        response: {
          success: null,
          failure: {
            ...createApiError(e),
          },
        },
      };
    }
    return res;
  };
}

const createApiError: (e: unknown) => {
  type: Stripe.StripeError['type'] | 'unknown';
  message: Stripe.StripeError['message'] | 'unknown';
} = function (e) {
  return {
    type: e instanceof Stripe.StripeError ? e.type : 'unknown',
    message: e instanceof Stripe.StripeError ? e.message : 'unknown',
  };
};

export default StripeWrapper;
