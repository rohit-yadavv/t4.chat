"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { OpenRouter } from "@lobehub/icons";
import GeminiAPIConnect from "./gemini-api-connect";
import { useRouter } from "next/navigation";

const ConnectTab = ({generatedCodeChallenge,redirectUrl}:{generatedCodeChallenge:string,redirectUrl:string}) => {
    const params=useSearchParams();
    const service=params.get("service")||"openrouter";
    const router=useRouter();
  return (
    <Tabs defaultValue={service} onValueChange={(value)=>{router.push(`/connect?service=${value}`)}} className="w-full">
        <TabsList className="grid rounded-full w-full h-10 grid-cols-2">
          <TabsTrigger
            value="openrouter"
            className="flex data-[state=active]:!bg-background rounded-full items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            OpenRouter
          </TabsTrigger>
          <TabsTrigger
            value="gemini"
            className="flex data-[state=active]:!bg-background rounded-full items-center gap-2"
          >
            <Key className="h-4 w-4" />
            Gemini API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="openrouter" className="mt-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <OpenRouter.Avatar size={55} shape={"square"} />
              </div>
              <CardTitle>Connect with OpenRouter</CardTitle>
              <CardDescription>
                Access multiple AI models through a single unified API
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link
                href={`https://openrouter.ai/auth?callback_url=${redirectUrl}&code_challenge=${generatedCodeChallenge}&code_challenge_method=S256`}
              >
                <Button size="lg" className="rounded-full" variant="t3">
                  Connect OpenRouter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gemini" className="mt-6">
          <GeminiAPIConnect />
        </TabsContent>
      </Tabs>
  
  );
};

export default ConnectTab;
