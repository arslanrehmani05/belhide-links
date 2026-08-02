"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface QrParams {
  product?: string;
  collection?: string;
  campaign?: string;
  source?: string;
  color?: string;
  size?: string;
  season?: string;
  hasParams: boolean;
}

export function useQrParams(): QrParams {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const product = searchParams.get("product") || undefined;
    const collection = searchParams.get("collection") || undefined;
    const campaign = searchParams.get("campaign") || undefined;
    const source = searchParams.get("source") || undefined;
    const color = searchParams.get("color") || undefined;
    const size = searchParams.get("size") || undefined;
    const season = searchParams.get("season") || undefined;

    const hasParams = Boolean(product || collection || campaign || source || color || size || season);

    return {
      product,
      collection,
      campaign,
      source,
      color,
      size,
      season,
      hasParams,
    };
  }, [searchParams]);
}
