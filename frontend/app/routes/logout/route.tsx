import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { destroySession } from "../../session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await isAuthenticated(request);
  if (!session) {
    return redirect("/login");
  }

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
