import { objectType } from 'nexus';
import Stripe from 'stripe';
import { Context } from '../../../context';

export const PaymentInformation = objectType({
  name: 'PaymentInformation',
  definition(t) {
    t.nullable.string('cardNumber');
    t.nullable.int('expiryMonth');
    t.nullable.int('expiryYear');
    t.nullable.string('type');
  },
});
export const CustomerCharge = objectType({
  name: 'CustomerCharge',
  definition(t) {
    t.nullable.int('amount');
    t.nullable.int('date');
    t.nullable.string('card');
    t.nullable.string('status');
    t.nullable.string('description');
    t.nullable.string('invoiceId');
    t.nullable.string('currency');
  },
});
export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('fullName');
    t.string('email');
    t.string('handle');
    t.int('zip');
    t.list.field('charges', {
      type: 'CustomerCharge',
      resolve: async (_, args, ctx: Context) => {
        if (!ctx.user?.stripeId || _.email !== ctx.user?.email) return [];
        const charges = await ctx.dataSources!.stripeWrapper.getCustomerCharges({ customerId: ctx.user.stripeId });
        if (!charges.response.success) return [];
        return charges.response.success.body.data.map((charge) => {
          return {
            currency: charge.currency,
            amount: charge.amount,
            date: charge.created,
            card: charge.payment_method_details?.card?.last4,
            status: charge.status,
            description: charge.description,
            invoiceId: charge.invoice as string,
          };
        });
        // TODO fix
        // .sort((a, b) => b.date - a.date)
      },
    });
    t.list.field('paymentMethods', {
      type: 'PaymentInformation',
      resolve: async (_, args, ctx: Context) => {
        console.log(ctx.user?.stripeId);
        if (!ctx.user?.stripeId || _.email !== ctx.user?.email) return [];
        const userInfo = await ctx.dataSources!.stripeWrapper.getCustomerPaymentMethods({
          customerId: ctx.user.stripeId,
        });
        if (!userInfo.response.success) return [];
        return userInfo.response.success.body.data.map((info) => {
          return {
            cardNumber: info.card?.last4,
            type: info.card?.brand,
            expiryMonth: info?.card?.exp_month,
            expiryYear: info?.card?.exp_year,
          };
        });
      },
    });
    t.nullable.field('defaultPayment', {
      type: PaymentInformation,
      resolve: async (_, args, ctx: Context) => {
        if (!ctx.user?.stripeId || _.email !== ctx.user?.email) return null;
        const userInfo = await ctx.dataSources!.stripeWrapper.getCustomer({ customerId: ctx.user.stripeId });
        if (!userInfo.response.success) return null;
        const info = userInfo.response.success.body as Stripe.Customer;
        return {
          // TODO default pay
          cardNumber: info.invoice_settings.default_payment_method as string,
          type: 'notsure yet',
          expiryMonth: 0,
          expiryYear: 7,
        };
      },
    });
  },
});
