"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import { createOrUpdateGeminiKey } from "@/action/user.action";
import Link from "next/link";
import { Gemini } from "@lobehub/icons";
import userStore from "@/stores/user.store";

const GeminiAPIConnect = () => {
  const queryClient = useQueryClient();
  const { userData, setUserData, currentService, setCurrentService } = userStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State to track current input value and changes
  const [currentApiKey, setCurrentApiKey] = useState(userData?.geminiApiKey || "");
  const [hasChanges, setHasChanges] = useState(false);
  
  // Update state when userData changes
  useEffect(() => {
    const storedKey = userData?.geminiApiKey || "";
    setCurrentApiKey(storedKey);
    setHasChanges(false);
  }, [userData?.geminiApiKey]);
  
  const geminiMutation = useMutation({
    mutationFn: async (apiKey: string) => {
      const result = await createOrUpdateGeminiKey(apiKey);
      if (result.error) {
        throw new Error(result.error);
      }
      setUserData(result.data);
      return result.data;
    },
    onSuccess: (data) => {
      toast.success("Gemini API key connected successfully!");
      setCurrentService("gemini");
      setHasChanges(false);
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(`Failed to connect API key: ${error.message}`);
    },
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentApiKey(newValue);
    
    // Check if the current value is different from stored value
    const storedKey = userData?.geminiApiKey || "";
    setHasChanges(newValue.trim() !== storedKey.trim());
  };

  const handleGeminiSubmit = async (formData: FormData) => {
    const apiKey = formData.get("geminiApiKey") as string;

    if (!apiKey || apiKey.trim() === "") {
      toast.error("Please enter a valid API key");
      return;
    }

    // Only proceed if there are changes
    if (!hasChanges) {
      toast.info("No changes detected in API key");
      return;
    }

    geminiMutation.mutate(apiKey.trim());
  };

  // Determine button state
  const isButtonDisabled = geminiMutation.isPending || !hasChanges || !currentApiKey.trim();

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Gemini.Avatar size={55} shape={"square"} />
        </div>
        <CardTitle>Use Gemini API Key</CardTitle>
        <CardDescription>
          Enter your Google Gemini API key to start using Gemini models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleGeminiSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="geminiApiKey">Gemini API Key</Label>
            <Input
              id="geminiApiKey"
              maxLength={100}
              value={currentApiKey}
              onChange={handleInputChange}
              name="geminiApiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              className="w-full"
              required
              disabled={geminiMutation.isPending}
            />
            <p className="text-sm text-muted-foreground">
              Your API key is stored securely and never shared
              {hasChanges && (
                <span className="text-amber-600 ml-2">• Changes detected</span>
              )}
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={isButtonDisabled}
          >
            {geminiMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                {hasChanges ? "Update API Key" : "Connect with API Key"} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {!hasChanges && userData?.geminiApiKey && (
            <p className="text-sm text-center text-muted-foreground">
              API key is already connected. Make changes to update.
            </p>
          )}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an API key?{" "}
            <Link
              href="https://aistudio.google.com/app/apikey"
              className="text-primary hover:underline"
              target="_blank"
            >
              Get one from Google AI Studio
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeminiAPIConnect;