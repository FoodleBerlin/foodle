import StripeWrapper from './stripe/endpoints';

const datasources = () => {
  let stripeWrapper = new StripeWrapper();
  return {
    stripeWrapper,
  };
};

export default datasources;
