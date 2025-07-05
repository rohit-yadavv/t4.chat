"use client";
import { getUser, updateKey } from "@/action/user.action";
import userStore from "@/stores/user.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const {setUserData} = userStore();

  const setUser = async () => {
   const user = await getUser();
   updateKey(user.data ? user.data : null);
   setUserData(user.data ? user.data : null);
  };
  useEffect(() => {
    setUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
