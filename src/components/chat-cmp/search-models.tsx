import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LuChevronDown } from "react-icons/lu";
import { Gem, Info, Eye, FileText, Brain } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { openRouterModelsQueryOptions } from "@/service/open-router";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn, truncateChars } from "@/lib/utils";
import { getProviderIcon } from "@/lib/provider-icons";
import userStore from "@/stores/user.store";
import DevTooltip from "../global-cmp/dev-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge: React.ReactNode | null;
  capabilities: React.ReactNode[];
  isActive: boolean;
}

export default function SearchModels() {
  const router = useRouter();
  const popoverRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    userData,
    currentModel,
    setCurrentModel,
    currentService,
    setCurrentService,
  } = userStore();

  const { data: openRouterModels, isLoading } = useQuery({
    ...openRouterModelsQueryOptions,
    enabled: isModalOpen,
  });

  const getCapabilities = (model: any): React.ReactNode[] => {
    const caps: React.ReactNode[] = [];
    const modalities = model.architecture?.input_modalities || [];

    if (modalities.includes("image")) caps.push(<Eye className="h-4 w-4" />);
    if (modalities.includes("file"))
      caps.push(<FileText className="h-4 w-4" />);
    if (model.supported_parameters?.includes("reasoning"))
      caps.push(<Brain className="h-4 w-4" />);

    return caps;
  };

  const processedModels: Model[] = (openRouterModels?.data || []).map(
    (model: any): Model => ({
      id: model.id,
      name: model.name,
      description: model.description,
      icon: getProviderIcon(model.id),
      badge:
        model.tier === "premium" ? (
          <Gem className="size-3 text-muted-foreground" />
        ) : null,
      capabilities: getCapabilities(model),
      isActive: userData?.models?.selected?.includes(model.id) || false,
    })
  );

  const filteredModels = processedModels.filter((model) =>
    model.name
      .toLowerCase()
      .includes(
        currentService === "gemini" ? "gemini" : searchQuery.toLowerCase()
      )
  );

  const handleModelSelect = (id: string, modelName: string): void => {
    setCurrentModel(id);
    toast.success(`${modelName} selected successfully`);
    setIsModalOpen(false);
  };

  return (
    <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          variant="ghost"
          className="gap-2"
        >
          <span className="max-w-[100px] capitalize truncate">
            {currentModel?.split("/")[1]?.replace(/-/g, " ") ||
              "gemini-2.5-flash"}
          </span>
          <LuChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        ref={popoverRef}
        className="w-[90vw] max-w-[640px] max-h-[80vh] overflow-y-auto p-4"
      >
        <Tabs
          value={currentService}
          onValueChange={(val: string) => {
            const service = val as "openrouter" | "gemini";
            setCurrentService(service);
            setCurrentModel(
              service === "openrouter"
                ? "meta-llama/llama-3.1-405b-instruct"
                : "google/gemini-2.5-flash"
            );
            toast.info(`${service.toUpperCase()} service selected`);
          }}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="openrouter">OpenRouter</TabsTrigger>
            <TabsTrigger value="gemini">Gemini</TabsTrigger>
          </TabsList>
        </Tabs>

        {!userData && (
          <Button
            onClick={() => router.push("/auth")}
            variant="outline"
            className="w-full mb-3"
          >
            Login to connect APIs
          </Button>
        )}

        {userData &&
          currentService === "openrouter" &&
          !userData.openRouterApiKey && (
            <Button
              onClick={() => router.push("/connect?service=openrouter")}
              variant="outline"
              className="w-full mb-3"
            >
              Connect OpenRouter API
            </Button>
          )}

        {userData && currentService === "gemini" && !userData.geminiApiKey && (
          <Button
            onClick={() => router.push("/connect?service=gemini")}
            variant="outline"
            className="w-full mb-3"
          >
            Connect Gemini API
          </Button>
        )}

        <Command>
          <CommandInput
            placeholder="Search models..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="sm:max-h-96 max-h-56 overflow-y-auto">
            <CommandGroup heading="Models">
              {filteredModels.map((model) => (
                <CommandItem
                  key={model.id}
                  onSelect={() => handleModelSelect(model.id, model.name)}
                  disabled={!model.isActive}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors",
                    model.isActive
                      ? "cursor-pointer hover:bg-accent"
                      : "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Left: Icon + name + badge */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center size-6 shrink-0 rounded-md bg-accent text-accent-foreground">
                      {model.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sm text-foreground items-center flex gap-2">
                        {model.name}
                        {model.description && (
                          <DevTooltip
                            place="bottom"
                            tipData={
                              <span className="max-w-xs block truncate text-xs leading-snug">
                                {truncateChars(model.description, 500)}
                              </span>
                            }
                          >
                            <Button
                              className="bg-transparent hover:bg-primary/10 p-1 text-muted-foreground hover:text-foreground"
                              aria-label="Model info"
                            >
                              <Info className="size-3.5 opacity-60" />
                            </Button>
                          </DevTooltip>
                        )}
                      </p>
                    </div>
                    {model.badge && (
                      <div className="ml-2 text-yellow-500 group-hover:scale-110 transition-transform">
                        {model.badge}
                      </div>
                    )}
                  </div>

                  {/* Right: Capabilities */}
                  <div className="flex gap-2 ml-4">
                    {model.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center size-5 rounded-md bg-muted text-muted-foreground"
                      >
                        {cap}
                      </div>
                    ))}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
