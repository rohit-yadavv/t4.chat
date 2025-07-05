import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { connectToOpenRouter } from "@/action/open-router.action";
import { getGeneratedCodeChallenge } from "@/lib/code-challenge";
import { ArrowRight, Key, Zap } from "lucide-react";
import { Gemini, OpenRouter } from "@lobehub/icons";
import GeminiAPIConnect from "./gemini-api-connect";
import ConnectTab from "./connect-tab";

interface OpenRouterConnectProps {
  code?: string;
}

const OpenRouterConnect = async ({ code }: OpenRouterConnectProps) => {
  const generatedCodeChallenge = await getGeneratedCodeChallenge();

  // Handle connection if code is provided
  if (code) {
    await connectToOpenRouter(code);
  }

  const redirectUrl =
    process.env.OPEN_ROUTER_REDIRECT_URI || "";

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect to AI Services</h1>
        <p className="text-muted-foreground">
          Choose how you'd like to access AI models to start chatting
        </p>
      </div>
      <ConnectTab generatedCodeChallenge={generatedCodeChallenge} redirectUrl={redirectUrl} />
      <div className="mt-8 w-full">
        <Accordion collapsible type="single" className="w-full">
          <AccordionItem value="what-is-openrouter">
            <AccordionTrigger className="text-left">
              What is OpenRouter?
            </AccordionTrigger>
            <AccordionContent>
              OpenRouter is a unified API service that provides access to a
              collection of AI models from leading companies like OpenAI,
              Anthropic, Google, and more in one place. It offers competitive
              pricing and easy model switching.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gemini-vs-openrouter">
            <AccordionTrigger className="text-left">
              Gemini API vs OpenRouter - Which should I choose?
            </AccordionTrigger>
            <AccordionContent>
              <strong>Gemini API:</strong> Direct access to Google's Gemini
              models with potentially lower latency. You'll need your own API
              key and will be billed directly by Google.
              <br />
              <br />
              <strong>OpenRouter:</strong> Access to multiple AI models
              including Gemini, GPT-4, Claude, and others. Easier to switch
              between models and compare responses. Single billing across all
              providers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="usage-limits">
            <AccordionTrigger className="text-left">
              Can I set usage limits?
            </AccordionTrigger>
            <AccordionContent>
              Yes, both options allow you to control costs:
              <br />
              <strong>OpenRouter:</strong> Set usage limits and spending caps
              directly in your OpenRouter dashboard.
              <br />
              <strong>Gemini API:</strong> Set quotas and budgets in Google
              Cloud Console to control your spending.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security">
            <AccordionTrigger className="text-left">
              How secure are my API keys?
            </AccordionTrigger>
            <AccordionContent>
              Your API keys are encrypted and stored securely. They're only used
              to make requests to the respective AI services and are never
              shared with third parties. You can revoke access at any time
              through your account settings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default OpenRouterConnect;
