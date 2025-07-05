import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Gem,
  Info,
  Eye,
  FileText,
  Brain,
  Key,
  ChevronUp,
  Filter,
  Pin,
  PinOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LuChevronDown, LuFilter } from "react-icons/lu";
import ModelFilters from "./model-filters";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { openRouterModelsQueryOptions } from "@/service/open-router";
import { getProviderIcon } from "@/lib/provider-icons";
import userStore from "@/stores/user.store";
import { useRouter } from "next/navigation";
import SidebarLogo from "../global-cmp/sidebar-logo";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import DevTooltip from "../global-cmp/dev-tooltip";

// Define interfaces
interface ModelCapability {
  icon: React.ReactNode;
  color: string;
  colorDark: string;
}

interface ProcessedModel {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  description: string;
  capabilities: ModelCapability[];
  isActive: boolean;
  isFavorite: boolean;
}

const ModelCard: React.FC<{
  model: ProcessedModel;
  onClick?: () => void;
}> = ({ model, onClick }) => {
  // Split model name into main model and submodel (if applicable)
  const modelParts = model.name.split(" ");
  const modelName = modelParts[0] || model.name;
  const subModel = modelParts.slice(1).join(" ") || "";

  return (
    <div className="group relative ">
      <Button
        variant="outline"
        className={cn(
          "group relative flex h-[148px] w-full flex-col items-start gap-0.5 overflow-hidden rounded-xl border border-chat-border/50 bg-sidebar/20 px-1 py-3 text-color-heading [--model-muted:hsl(var(--muted-foreground)/0.9)] [--model-primary:hsl(var(--color-heading))] hover:bg-accent/30 hover:text-color-heading dark:border-chat-border dark:bg-[hsl(320,20%,2.9%)] dark:[--model-muted:hsl(var(--color-heading))] dark:[--model-primary:hsl(var(--muted-foreground)/0.9)] dark:hover:bg-accent/30",
          !model.isActive && "opacity-70 cursor-not-allowed",
          model.isActive && "ring-2 ring-primary"
        )}
        disabled={!model.isActive}
        onClick={onClick}
      >
        <div className="flex w-full flex-col items-center justify-center gap-1 font-medium transition-colors">
          {/* Use the model's provider icon */}
          <div className="size-7 text-[--model-primary]">{model.icon}</div>
          <div className="w-full text-center text-[--model-primary]">
            <div className="text-base font-semibold">{modelName}</div>
            <div className="-mt-0.5 text-sm font-semibold">{subModel}</div>
          </div>
          {/* Display capabilities */}
          <div className="flex items-center gap-1 mt-1">
            {model.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-md"
                style={{ color: cap.color }}
              >
                <div className="absolute inset-0 bg-current opacity-20 dark:opacity-15" />
                {cap.icon}
              </div>
            ))}
          </div>
          {/* Display badge if present */}
          {model.badge && <div className="mt-1">{model.badge}</div>}
        </div>
      </Button>
      <div
        className={cn(
          "absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 -right-1.5 -top-4 left-auto z-50 flex w-auto translate-y-2 items-center rounded-[10px] border border-chat-border/40 bg-card p-1 text-xs text-muted-foreground transition-all",
          !model.isActive && "hidden"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded-md bg-accent/30 hover:bg-muted/50 disabled:cursor-not-allowed"
          tabIndex={-1}
          aria-label={model.isFavorite ? "Unpin model" : "Pin model"}
        >
          {model.isFavorite ? (
            <PinOff className="lucide lucide-pin-off size-4" />
          ) : (
            <Pin className="lucide lucide-pin size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default function SearchModels() {
  const router = useRouter();
  const [isAll, setIsAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    userData,
    currentModel,
    setCurrentModel,
    currentService,
    setCurrentService,
  } = userStore();

  // Fetch data only when popover is open
  const {
    data: openRouterModels,
    isLoading,
    error,
  } = useQuery({
    ...openRouterModelsQueryOptions,
    enabled: isModalOpen, // Only fetch when modal is open
  });

  // Handle clicking outside the popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const getModelCapabilities = (model: any): ModelCapability[] => {
    const capabilities: ModelCapability[] = [];

    if (model.architecture?.input_modalities?.includes("image")) {
      capabilities.push({
        icon: <Eye className="h-4 w-4" />,
        color: "hsl(168 54% 52%)",
        colorDark: "hsl(168 54% 74%)",
      });
    }

    if (model.architecture?.input_modalities?.includes("file")) {
      capabilities.push({
        icon: <FileText className="h-4 w-4" />,
        color: "hsl(237 55% 57%)",
        colorDark: "hsl(237 75% 77%)",
      });
    }

    if (model.supported_parameters?.includes("reasoning")) {
      capabilities.push({
        icon: <Brain className="h-4 w-4" />,
        color: "hsl(263 58% 53%)",
        colorDark: "hsl(263 58% 75%)",
      });
    }

    return capabilities;
  };

  const processedModels: ProcessedModel[] = (openRouterModels?.data || []).map(
    (model: any) => {
      const selectedModels = userData?.models?.selected || [];

      return {
        id: model.id,
        name: model.name,
        description: model.description,
        icon: getProviderIcon(model.id),
        badge:
          model.tier === "premium" ? (
            <Gem className="size-3 text-muted-foreground" />
          ) : null,
        capabilities: getModelCapabilities(model),
        isActive: selectedModels.includes(model.id),
        isFavorite: false, // Adjust based on your favorite logic
      };
    }
  );

  const filteredModels = processedModels.filter((model) =>
    model.name
      .toLowerCase()
      .includes(
        currentService === "gemini" ? "gemini" : searchQuery.toLowerCase()
      )
  );

  const handleModelSelect = (modelId: string, modelName: string) => {
    setCurrentModel(modelId); // Set current model first
    toast.success(`${modelName} model selected successfully`);
    setIsModalOpen(false); // Close modal after selection
  };

  if (isLoading && isModalOpen) {
    return (
      <DropdownMenu open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="ghost"
            className="gap-2"
          >
            {isLoading ? (
              <div className="text-center flex items-center gap-2">
                Loading Models
                <FiLoader size={16} className="animate-spin" />
              </div>
            ) : (
              <>
                <span className="max-w-[100px] truncate">
                  {currentModel || "google/gemini-2.5-flash"}
                </span>
                <LuChevronDown />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }

  if (error && isModalOpen) {
    return (
      <DropdownMenu open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            variant="ghost"
            className="gap-2"
          >
            <span className="max-w-[100px] truncate capitalize">
              {currentModel && currentModel.includes("/")
                ? currentModel.split("/")[1].trim().replace(/-/g, " ")
                : "gemini-2.5-flash"}
            </span>{" "}
            <LuChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] p-4">
          <div className="text-center text-red-500">Error loading models</div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenuTrigger >
       <DevTooltip tipData={`${currentService} : ${currentModel}`}>
       <Button
          onClick={() => setIsModalOpen(true)}
          size="sm"
          variant="ghost"
          className="gap-2"
        >
          <span className="max-w-[100px] capitalize truncate">
            {currentModel && currentModel.includes("/")
              ? currentModel.split("/")[1].trim().replace(/-/g, " ")
              : "gemini-2.5-flash"}
          </span>{" "}
          <LuChevronDown />
        </Button>
       </DevTooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={popoverRef}
        className={cn(
          "min-w-[8rem]",
          "max-w-[calc(100vw-2rem)] !h-fit transition-all p-2 py-1 flex flex-col gap-2 max-sm:mx-4 max-h-[calc(100vh-80px)]",
          isAll ? "w-[650px]" : "w-[420px]"
        )}
        side="top"
        align="start"
        style={{ height: "616px" }}
      >
        <div className="border-b border-chat-border bg-popover px-1 pt-0.5 sm:inset-x-0">
          <div className="flex items-center">
            <Search className="ml-px mr-3 size-4 text-muted-foreground !text-[14px]" />
            <input
              role="searchbox"
              aria-label="Search models"
              placeholder="Search models..."
              className="p-1.5 !outline-none !border-none !bg-transparent flex-1 px-1 pr-12 !text-[14px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Tabs
            value={currentService}
            onValueChange={(value) => {
              setCurrentService(value as "openrouter" | "gemini");
              setCurrentModel(
                value === "openrouter"
                  ? "meta-llama/llama-3.1-405b-instruct"
                  : "google/gemini-2.5-flash"
              );
              toast.info(`${value.toLocaleUpperCase()} Service selected`);
            }}
            defaultValue="openrouter"
            className="w-full"
          >
            <TabsList className="grid x w-full h-10 grid-cols-2">
              <TabsTrigger
                className="flex data-[state=active]:!bg-background items-center gap-2"
                value="openrouter"
              >
                OpenRouter
              </TabsTrigger>
              <TabsTrigger
                className="flex data-[state=active]:!bg-background items-center gap-2"
                value="gemini"
              >
                Gemini
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-h-full flex-1 overflow-y-scroll px-1.5">
          <div className="rounded-xl text-card-foreground border-0 bg-popover py-2.5">
            <div className="flex flex-col space-y-3 rounded-md bg-popover background-reflect border-reflect p-5">
              <h3 className="text-lg font-semibold">
                {currentService === "openrouter"
                  ? "Unlock 100+ LLM models in"
                  : "Unlock all Google models in"}
              </h3>
              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <SidebarLogo className="text-wordmark-color" />
                </div>
                {!userData && (
                  <Button onClick={() => router.push("/auth")} variant="t3">
                    Login
                  </Button>
                )}
                {userData &&
                  currentService === "openrouter" &&
                  !userData.openRouterApiKey && (
                    <Button
                      onClick={() => {
                        router.push("/connect?service=openrouter");
                        setIsModalOpen(false);
                      }}
                      variant="t3"
                    >
                      Connect OpenRouter API
                    </Button>
                  )}
                {userData &&
                  currentService === "gemini" &&
                  !userData.geminiApiKey && (
                    <Button
                      onClick={() => {
                        router.push("/connect?service=gemini");
                        setIsModalOpen(false);
                      }}
                      variant="t3"
                    >
                      Connect Gemini API
                    </Button>
                  )}
                {userData &&
                  currentService === "openrouter" &&
                  userData.openRouterApiKey && (
                    <Button
                      onClick={() => {
                        router.push("https://openrouter.ai/settings/credits");
                        setIsModalOpen(false);
                      }}
                      variant="t3"
                    >
                      Manage
                    </Button>
                  )}
                {userData &&
                  currentService === "gemini" &&
                  userData.geminiApiKey && (
                    <Button
                      onClick={() => {
                        router.push("/connect?service=gemini");
                        setIsModalOpen(false);
                      }}
                      variant="t3"
                    >
                      Manage
                    </Button>
                  )}
              </div>
            </div>
          </div>

          {isAll ? (
            <div className="flex w-full flex-wrap justify-start gap-3.5 pb-4 pl-3 pr-2 pt-2.5">
              <div className="-mb-2 ml-0 flex w-full select-none items-center justify-start gap-1.5 text-color-heading">
                <Pin className="lucide lucide-pin mt-px size-4" />
                Favorites
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {filteredModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onClick={() => handleModelSelect(model.id, model.name)}
                  />
                ))}
              </div>
            </div>
          ) : (
            filteredModels.map((model) => (
              <div
                key={model.id}
                role="menuitem"
                className={cn(
                  "relative select-none rounded-sm text-sm outline-none transition-colors focus:bg-accent/30 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex flex-col items-start gap-1 p-3  cursor-pointer hover:bg-accent/30"
                )}
                onClick={() => handleModelSelect(model.id, model.name)}
              >
                <div className="flex w-full overflow-hidden items-center justify-between">
                  <div
                    className={cn(
                      "flex text-nowrap truncate items-center gap-2 pr-2 font-medium transition-colors text-foreground"
                    )}
                  >
                    {model.icon}
                    <span className="w-fit">{model.name}</span>
                    {model.badge}
                    <DevTooltip
                      tipData={
                        <p className="line-clamp-3 max-w-[200px]">
                          {model.description}
                        </p>
                      }
                    >
                      <Button variant="ghost" size="icon" className="p-1.5">
                        <Info className="size-3 text-foreground" />
                      </Button>
                    </DevTooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    {model.capabilities.map((cap, idx) => (
                      <div
                        key={idx}
                        className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-md"
                        style={{ color: cap.color }}
                      >
                        <div className="absolute inset-0 bg-current opacity-20 dark:opacity-15" />
                        {cap.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex border-t border-t-chat-border items-center justify-between bg-popover py-1">
          <Button onClick={() => setIsAll(!isAll)} variant="ghost">
            <ChevronUp className={cn("h-4 w-4", isAll ? "-rotate-90" : "")} />
            {isAll ? "Favorites" : "Show all"}
          </Button>
          <ModelFilters />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
