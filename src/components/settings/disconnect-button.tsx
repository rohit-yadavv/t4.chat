"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateKey, removeOpenRouterApiKey } from "@/action/user.action";

const DisconnectButton = () => {
  const [open, setOpen] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: disconnectMutation } = useMutation({
    mutationFn: async () => {
      // Update both database and session
      await Promise.all([
        removeOpenRouterApiKey(),
        updateKey({ openRouterApiKey: "" })
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Successfully disconnected from OpenRouter');
      setOpen(false);
      router.push('/connect');
    },
    onError: () => {
      toast.error('Failed to disconnect from OpenRouter');
      setIsDisconnecting(false);
    },
  });

  const handleDisconnect = () => {
    setIsDisconnecting(true);
    disconnectMutation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground">
          Disconnect
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Disconnect OpenRouter</DialogTitle>
          <DialogDescription>
            Are you sure you want to disconnect from OpenRouter? This will remove your API key and you'll need to reconnect to use AI features.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDisconnecting}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            variant="destructive"
            onClick={handleDisconnect}
            disabled={isDisconnecting}
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisconnectButton; 