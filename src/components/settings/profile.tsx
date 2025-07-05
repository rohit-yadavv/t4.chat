import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser } from "@/action/user.action";
import { getMessageUsage } from "@/action/message.action";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { AlertTriangle, Info, Key } from "lucide-react";
import Link from "next/link";
import { getCredit } from "@/action/open-router.action";
import { redirect } from "next/navigation";
import DisconnectButton from "./disconnect-button";
import { Gemini, OpenRouter } from "@lobehub/icons";

const Profile = async () => {
  const [userData, creditData] = await Promise.all([getUser(), getCredit()]);

  const user = userData.data;
  console.log("creditData", creditData);
  console.log("userData", userData);

  return (
    <div className="w-80">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarImage src={user?.image} />
          <AvatarFallback className="text-xl font-bold">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mb-1">{user?.name}</h2>
        <p className="text-md text-muted-foreground font-medium mb-3">
          {user?.email}
        </p>
        <Badge variant="secondary">Special Plan</Badge>
      </div>

      {/* API Keys Section with Tabs */}
      <Card className="mb-6 p-4 rounded-lg">
        <Tabs defaultValue="openrouter" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="openrouter" className="flex items-center gap-2">
              <OpenRouter.Avatar size={16} />
              OpenRouter
            </TabsTrigger>
            <TabsTrigger value="gemini" className="flex items-center gap-2">
              <Gemini.Avatar size={16} />
              Gemini
            </TabsTrigger>
          </TabsList>

          {/* OpenRouter Tab Content */}
          <TabsContent value="openrouter" className="mt-0">
            {user?.openRouterApiKey ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <OpenRouter.Avatar size={32} />
                  <h3 className="text-sm font-medium">OpenRouter Credits</h3>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      $ {creditData?.data?.total_credits?.toFixed(2)}
                    </span>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Link
                    target="_blank"
                    href="https://openrouter.ai/settings/credits"
                  >
                    <Button size="sm" className="rounded-full">
                      Add credits
                    </Button>
                  </Link>
                </div>

                <div className="mb-4">
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        <span>
                          You are on the OpenRouter free tier. Some requests may
                          be rate-limited or fail. Please add some credits to
                          your account.{" "}
                        </span>
                        <Link
                          target="_blank"
                          href="https://openrouter.ai/docs/api-reference/limits#rate-limits-and-credits-remaining"
                        >
                          <span className="text-orange-600 underline cursor-pointer">
                            Learn More
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">sk-or-v1-d5a...</span>
                    </div>
                    <DisconnectButton />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <OpenRouter.Avatar size={32} />
                  <h3 className="text-sm font-medium">OpenRouter Connection</h3>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect OpenRouter to access various AI models with flexible
                    pricing.
                  </p>

                  <div className="flex justify-start">
                    <Link href="/connect?service=openrouter">
                      <Button size="lg" className="rounded-full" variant="t3">
                        Connect OpenRouter
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Gemini Tab Content */}
          <TabsContent value="gemini" className="mt-0">
            {user?.geminiApiKey ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Gemini.Avatar size={32} />
                  <h3 className="text-sm font-medium">Gemini API Connected</h3>
                </div>

                <div className="mb-4">
                  <div className="bg-background border border-input rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <div className="text-xs text-primary">
                        <span>
                          Your Gemini API key is active. You can now use
                          Google's latest AI models including Gemini Pro and
                          Ultra.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-mono">
                        AIza...{user.geminiApiKey?.slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Link  href="/connect?service=gemini">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                    >
                      Manage API Key
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                 <Gemini.Avatar size={32} />
                  <h3 className="text-sm font-medium">Gemini API Connection</h3>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your Gemini API key to access Google's powerful AI
                    models directly.
                  </p>

                  <div className="flex justify-start">
                    <Link href="/connect?service=gemini">
                      <Button size="lg" className="rounded-full" variant="t3">
                        Connect Gemini API
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
