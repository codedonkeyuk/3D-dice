import { isRouteErrorResponse, useRouteError } from "react-router";
import { Error404, Error500, ErrorDiceMissing } from "./Errors";
import DiceNotFoundError from "./DiceNotFoundError";

export function RouteErrorBoundary() {
  const error = useRouteError();

  const isGeneric404 =
    (isRouteErrorResponse(error) && error.status === 404) ||
    (error as any)?.status === 404;

  if (isGeneric404) {
    return <Error404 />;
  }

  if (error instanceof DiceNotFoundError) {
    return <ErrorDiceMissing />;
  }

  return <Error500 />;
}
