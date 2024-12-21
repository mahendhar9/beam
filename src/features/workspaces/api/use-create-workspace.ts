import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  OnSuccess?: (data: ResponseType) => void;
  OnError?: (error: Error) => void;
  OnSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values);
        options?.OnSuccess?.(response);
        return response;
      } catch (error) {
        options?.OnError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.OnSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
