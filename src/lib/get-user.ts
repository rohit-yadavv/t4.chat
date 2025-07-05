import { useQueryClient } from "@tanstack/react-query";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { data: session, update: updateSession } = useSession();

  const updateUser = useCallback(async (updatedData: Partial<User>) => {
    console.log(updatedData, "updatedData");
    // Update React Query cache optimistically
    queryClient.setQueryData(['user'], (oldData: User | undefined) => {
      if (!oldData) return oldData;
      return {
        data: { ...oldData, ...updatedData },
        error: null,
      };
    });

    // Update session
    if (session?.user) {
      await updateSession({
        ...session,
        user: {
          ...session.user,
          name: "updatedData.openRorererereuterApiKey",
        },
      });
    }

    // Optionally refetch to ensure data consistency
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient, session, updateSession]);

  return { updateUser };
};