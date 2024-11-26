import { StatusCodes } from "http-status-codes";
import fetchBuilder from "fetch-retry";
import urlJoin from "url-join";

import { getLocalStorageItem } from "@/lib/storage";
import { APIError } from "./APIError";

const fetchRetry = fetchBuilder(fetch);
type Params = {
  body?: BodyInit | null;
  headers?: HeadersInit;
  retry?: boolean;
};

export const fetchServer = async (
  path: string,
  params: Params = {},
  method = "GET"
) => {
  if (!path.startsWith("http")) {
    path = urlJoin(process.env.NEXT_PUBLIC_BASE_URL!, path);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "test",
  };

  const token = getLocalStorageItem("token");
  if (token) {
    headers["Authorization"] = token;
  }

  Object.assign(headers, params.headers);

  const options = { body: params.body, method, headers };

  const retry = params.retry ?? false;

  const response = await (retry ? fetchRetry : fetch)(path, options);
  const { status } = response;

  if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
    throw new APIError(response);
  }

  const data = await response.json();
  if (!response.ok) {
    throw new APIError(response, data);
  }

  return data;
};

export const putServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>,
  method = "PUT"
) => {
  return fetchServer(path, { body: JSON.stringify(body), ...params }, method);
};

export const postServer = ( 
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>
) => {
  return putServer(path, body, params, "POST");
};

export const patchServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>
) => putServer(path, body, params, "PATCH");

export const deleteServer = (
  path: string,
  body?: Record<string, unknown>,
  params?: Record<string, unknown>
) => putServer(path, body, params, "DELETE");
