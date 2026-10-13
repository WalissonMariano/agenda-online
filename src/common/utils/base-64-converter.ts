import { LoginPayload } from '../../auth/dto/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const token = authorization?.replace(/^Bearer\s+/i, '') ?? '';
  const authorizationSplited = token.split('.');

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
