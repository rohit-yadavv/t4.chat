// components/ChatInput.tsx
"use client";

import React, {
  useCallback,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  ArrowUp,
  ChevronDown,
  Globe,
  Paperclip,
  X,
  FileText,
  Image,
  Video,
  File,
} from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "zustand";
import chatStore from "@/stores/chat.store";
import { createThread } from "@/action/thread.action";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useStreamResponse } from "@/hooks/use-response-stream";
import { useCloudinaryUpload } from "@/hooks/use-upload"; // Import the hook
import SearchModels from "./search-models";
import { FiLoader } from "react-icons/fi";
import OpenRouterConnect from "../connect-key/open-router-connect";
import userStore from "@/stores/user.store";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import DevTooltip from "../global-cmp/dev-tooltip";

interface ChatInputProps {
  placeholder?: string;
  modelName?: string;
  isSearchEnabled?: boolean;
  isFileAttachEnabled?: boolean;
}

function ChatInput({
  placeholder = "Type your message here...",
  modelName = "Gemini 2.5 Flash",
  isSearchEnabled = false,
  isFileAttachEnabled = true,
}: ChatInputProps) {
  const params = useParams();
  const router = useRouter();
  const { sendMessage } = useStreamResponse();
  const {
    setQuery,
    setMessages,
    isLoading,
    query,
    setIsRegenerate,
    setIsWebSearch,
    isWebSearch,
  } = chatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cloudinary upload hook
  const { uploadState, uploadFile, resetUpload } = useCloudinaryUpload();
  const [attachmentUrl, setAttachmentUrl] = useState<string>("");
  const [attachmentPreview, setAttachmentPreview] = useState<{
    name: string;
    type: string;
    url: string;
  } | null>(null);

  const queryClient = useQueryClient();

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!query.trim() || isLoading || uploadState.isUploading) return;
      setQuery(query.trim());
      handleSubmit();
    }
  };

  const generateUUID = () => {
    const newId = uuidv4();
    return newId;
  };

  // Handle file selection and upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Show preview immediately
      setAttachmentPreview({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file), // Temporary URL for preview
      });

      // Upload to Cloudinary
      const uploadResult = await uploadFile(file);

      // Set the Cloudinary URL
      setAttachmentUrl(uploadResult.secure_url);

      // Update preview with Cloudinary URL
      setAttachmentPreview((prev) =>
        prev
          ? {
              ...prev,
              url: uploadResult.secure_url,
            }
          : null
      );
    } catch (error) {
      console.error("Upload failed:", error);
      // Remove preview on error
      setAttachmentPreview(null);
      setAttachmentUrl("");
    }
  };

  // Remove attachment
  const handleRemoveAttachment = () => {
    setAttachmentPreview(null);
    setAttachmentUrl("");
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!userStore.getState().userData) {
      toast.info("Please login to start chatting");
      router.push("/auth");
      return;
    }
    if (
      !userStore.getState().userData?.openRouterApiKey &&
      !userStore.getState().userData?.geminiApiKey
    ) {
      toast.info("Please connect to AI Services to start chatting");
      router.push("/connect");
      return;
    }
    const generatedId = generateUUID();
    setIsRegenerate(false);
    if (!params.chatid) {
      setMessages([]);
      router.push(`/chat/${generatedId}`);
    }
    await sendMessage({
      chatid: (params.chatid as string) || generatedId,
      attachmentUrl: attachmentUrl,
      resetAttachment: handleRemoveAttachment,
      isNewThread: !params.chatid,
    });

    if (!params.chatid) {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    }
    handleRemoveAttachment();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading || uploadState.isUploading) return;
    handleSubmit();
  };

  return (
    <div className="absolute  !bottom-0 h-fit inset-x-0 w-full">
      <div className="rounded-t-[20px] bg-chat-input-background/80 relative dark:bg-secondary/30 p-2 pb-0 backdrop-blur-lg ![--c:--chat-input-gradient] border-x border-secondary-foreground/5 gradBorder">
        <form
          onSubmit={handleFormSubmit}
          className="relative flex w-full pb-2 flex-col items-stretch gap-2 rounded-t-xl border border-b-0 border-white/70 dark:border-secondary-foreground/5 bg-chat-input-background px-3 pt-3 text-secondary-foreground outline-8 outline-chat-input-gradient/50 dark:outline-chat-input-gradient/5 pb-safe-offset-3  sm:max-w-3xl dark:bg-secondary/30"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 80px 50px 0px, rgba(0, 0, 0, 0.07) 0px 50px 30px 0px, rgba(0, 0, 0, 0.06) 0px 30px 15px 0px, rgba(0, 0, 0, 0.04) 0px 15px 8px, rgba(0, 0, 0, 0.04) 0px 6px 4px, rgba(0, 0, 0, 0.02) 0px 2px 2px",
          }}
        >
          {/* File Preview Section */}
          {attachmentPreview && (
            <div className="mb-2 p-1.5 bg-muted/30 group h-12 aspect-square w-fit grid items-center relative rounded-lg border border-border/50">
              <div className="grid place-items-center gap-2 w-fit rounded-md">
                {uploadState.isUploading && (
                  <FiLoader
                    className="animate-spin ml-1.5 text-primary"
                    size={20}
                  />
                )}
                {attachmentPreview.type.startsWith("pdf/") &&
                  !uploadState.isUploading && <File className="h-4 w-4" />}
                {attachmentPreview.type.startsWith("image/") &&
                  !uploadState.isUploading && (
                    <img
                      src={attachmentPreview.url}
                      alt="Preview"
                      className="h-8 w-8 object-cover rounded"
                    />
                  )}
              </div>

              <X
                className="h-5 rounded-md absolute group-hover:flex border-2 border-secondary hidden -top-2 -right-2 p-0 bg-destructive/20"
                onClick={handleRemoveAttachment}
                size={18}
              />
            </div>
          )}

          <div className="flex flex-grow flex-col">
            <div className="flex flex-grow flex-row items-start">
              <textarea
                placeholder={placeholder}
                autoFocus
                id="chat-input"
                value={query}
                className="w-full max-h-64 min-h-[54px] resize-none bg-transparent text-base leading-6 text-foreground outline-none placeholder:text-secondary-foreground/60 disabled:opacity-50 transition-opacity"
                aria-label="Message input"
                aria-describedby="chat-input-description"
                autoComplete="off"
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(e.target.value)}
                disabled={uploadState.isUploading}
              />
              <div id="chat-input-description" className="sr-only">
                Press Enter to send, Shift + Enter for new line
              </div>
            </div>

            <div className="-mb-px mt-2 flex w-full flex-row-reverse justify-between">
              <div
                className="-mr-0.5 -mt-0.5 flex items-center justify-center gap-2"
                aria-label="Message actions"
              >
                <Button
                  variant="t3"
                  type="submit"
                  size="icon"
                  disabled={
                    isLoading ||
                    (!query.trim() && !attachmentUrl) ||
                    uploadState.isUploading
                  }
                  className="transition-[opacity, translate-x] h-9 w-9 duration-200"
                >
                  <ArrowUp className="!size-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 pr-2 sm:flex-row sm:items-center">
                <div className="ml-[-7px] flex items-center gap-1">
                  {/* Model Selector */}
                  <SearchModels />

                  {/* Search Button */}
                  <DevTooltip tipData="Web Search">
                    <div>
                      <Button
                        asChild
                        type="button"
                        variant={isWebSearch ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsWebSearch(!isWebSearch)}
                        className={`
                      ${
                        isWebSearch
                          ? "bg-primary"
                          : "bg-transparent hover:bg-muted/40 "
                      }
                        !rounded-full text-xs !h-auto py-1.5 !px-2
                        `}
                        aria-label={
                          isSearchEnabled
                            ? "Web search"
                            : "Web search not available on free plan"
                        }
                        disabled={uploadState.isUploading}
                      >
                        <p>
                          <Globe className="h-4 w-4" />
                          <span className="max-sm:hidden">Search</span>
                        </p>
                      </Button>
                    </div>
                  </DevTooltip>

                  {/* File Attach Button */}
                  <DevTooltip tipData="Attach File (only Image)">
                    <div>
                      <Button
                        asChild
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-transparent hover:bg-muted/40 !rounded-full text-xs !h-auto py-1.5 !px-2.5"
                        aria-label={
                          isFileAttachEnabled
                            ? "Attach file"
                            : "Attaching files is a subscriber-only feature"
                        }
                        disabled={
                          !isFileAttachEnabled || isLoading || attachmentUrl
                            ? true
                            : false || uploadState.isUploading
                        }
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="size-4" />
                      </Button>
                    </div>
                  </DevTooltip>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    disabled={attachmentUrl ? true : false}
                    multiple={false}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
