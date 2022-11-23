
export type Token = {
  user: {
    id: string;
    fullName: string;
    email: string;
    stripeId: string | null;
  };
};

