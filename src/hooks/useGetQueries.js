import { useMemo } from "react";
import { useRouter } from "next/router";
import { getQueryString } from "@/utils";

export const useGetQueries = () => {
  const router = useRouter();
  const queries = useMemo(() => router.query, [router.query]);
  const otherQueries = useMemo(() => {
    return getQueryString(queries, false);
  }, [queries]);

  const queriesStr = useMemo(() => {
    return getQueryString(queries, true);
  }, [queries]);

  return [queries, otherQueries, queriesStr];
};
