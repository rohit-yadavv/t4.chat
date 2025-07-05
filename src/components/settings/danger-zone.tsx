"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

const DangerZone = () => {
  const handleRestoreLegacyData = () => {
    // Implementation for restoring legacy local data
    // console.log("Restoring legacy local data");
  };

  const handleRestoreOldChats = () => {
    // Implementation for restoring old chats
    // console.log("Restoring old chats");
  };

  const handleDeleteChatHistory = () => {
    // Implementation for deleting chat history
    // console.log("Deleting chat history");
  };

  return (
    <div className="space-y-6 mt-10">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Danger Zone</h2>
      </div>

      {/* Legacy Data Restore */}
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            We found locally stored chat data on your device. If you had sync
            disabled before, it might be missing. Click below to sync it to our
            servers.
          </p>
          <Button
            variant="outline"
            onClick={handleRestoreLegacyData}
            className="w-fit"
          >
            Restore Legacy Local Data
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            If your chats from before June 1st are missing, click this to bring
            them back. Contact support if you have issues.
          </p>
          <Button
            variant="default"
            onClick={handleRestoreOldChats}
            className="w-fit bg-pink-600 hover:bg-pink-700 text-white"
          >
            Restore old chats
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Permanently delete your history from both your local device and our
            servers.
            <span className="text-muted-foreground">*</span>
          </p>
          <Button
            variant="destructive"
            onClick={handleDeleteChatHistory}
            className="w-fit flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Chat History</span>
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground">
            * The retention policies of our LLM hosting partners may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DangerZone; 