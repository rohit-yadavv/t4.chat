"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Gemini, OpenRouter } from "@lobehub/icons";
import userStore from "@/stores/user.store";
import { toast } from "sonner";
const ServiceTab = () => {
  const { currentService, setCurrentService } = userStore();
  return (
    <Tabs
      value={currentService}
      onValueChange={(value) => {
        setCurrentService(value as "openrouter" | "gemini");
        toast.success(`${value} service selected successfully`);
      }}
      className="w-full"
    >
      <TabsList className="grid w-full h-12 md:w-96 rounded-full grid-cols-2 items-center">
        <TabsTrigger
          className="rounded-full flex data-[state=active]:!bg-background gap-3"
          value="openrouter"
        >
          <OpenRouter.Avatar size={24} />
          OpenRouter
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full flex data-[state=active]:!bg-background gap-3"
          value="gemini"
        >
          <Gemini.Avatar size={24} />
          Gemini
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ServiceTab;
