"use client";

import { queryClient } from "@/app/_queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
