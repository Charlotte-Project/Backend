export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AccessToken = Pick<Tokens, 'accessToken'>;
