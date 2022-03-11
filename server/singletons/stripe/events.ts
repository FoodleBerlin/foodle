/**
 * Cover the automatic success and failure
 * Cover the manual success and failure
 */
export type Currency = 'eur' | 'usd';
export type StripeEvent =
  | CustomerCreatedEvent
  | PaymentIntentRequiresActionEvent
  | InvoicePaymentSucceededEvent
  | InvoicePaymentFailedEvent;

export type DefaultEvent<T extends string, K> = {
  type: T;
  data: {
    object: {
      [J in keyof K]: K[J];
    };
  };
};

export type CustomerCreatedEvent = DefaultEvent<
  'customer.created',
  {
    object: 'customer';
    id: string;
  }
>;
/**
 * May come before payment_intent.requires action
 */
export type InvoicePaymentFailedEvent = DefaultEvent<
  'invoice.payment_failed',
  {
    object: 'invoice';
    account_country: string;
    account_name: string;
    amount_due: number;
    amount_paid: number;
    amount_remaining: number;
    attempt_count: number;
    collection_method: string;
    currency: Currency;
    customer: string;
    customer_email: string;
    default_payment_method: string;
    hosted_invoice_url: string;
    invoice_pdf: string;
    metadata: any;
    paid: boolean;
    paid_out_of_band: false;
    payment_intent: string;
    status: string;
    status_transitions: {
      finalized_at: number;
      marked_uncollectible_at: null;
      paid_at: null;
      voided_at: null;
    };
    subtotal: 1400;
    tax: null;
    total: 1400;
  }
>;

export type InvoicePaymentSucceededEvent = DefaultEvent<
  'invoice.payment_succeeded',
  {
    object: 'invoice';
    id: string;
    account_country: string;
    account_name: string;
    amount_due: number;
    amount_paid: number;
    amount_remaining: number;
    billing_reason: string;
    charge: string;
    collection_method: string;
    currency: Currency;
    customer: string;
    customer_email: string;
    default_payment_method: string;
    hosted_invoice_url: string;
    invoice_pdf: string;
    metadata: any;
    paid: boolean;
    paid_out_of_band: false;
    payment_intent: string;
    status: string;
    status_transitions: {
      finalized_at: number;
      marked_uncollectible_at: null;
      paid_at: number;
      voided_at: null;
    };
    subtotal: 1400;
    tax: null;
    total: 1400;
  }
>;

export type PaymentIntentRequiresActionEvent = DefaultEvent<
  'payment_intent.requires_action',
  {
    id: string;
    status: 'requires_action';
    object: 'payment_intent';
    amount: number;
    capture_method: string;
    client_secret: string;
    created: number;
    currency: Currency;
    metadata: any;
    next_action: {
      type: string;
      user_stripe_sdk: {
        type: string;
        stripe_js: string;
        source: string;
      };
    };
    payment_method: string;
  }
>;
