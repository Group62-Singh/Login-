import { redirect } from "@remix-run/node";
import { getSession } from "../session.server";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (
    !(
      session.data &&
      "credentials" in session.data &&
      session.data.credentials !== undefined &&
      "accessToken" in session.data.credentials
    )
  ) {
    return { session };
  }
  try {
    const user = await jwt.verify(
      session.data.credentials.accessToken,
      // TODO: extract the secret shared with issuer to env file
      "c37ff2a68f64943aba2aa71b4f167880a0c34f5df7fad668976c0501e85f0274"
    );
    return { user, session };
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
    }
  }
  return { session };
};
