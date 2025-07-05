"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VisualOptions() {
  const [boringTheme, setBoringTheme] = useState(false);
  const [hidePersonalInfo, setHidePersonalInfo] = useState(false);
  const [disableThematicBreaks, setDisableThematicBreaks] = useState(true);
  const [statsForNerds, setStatsForNerds] = useState(true);
  const [mainFont, setMainFont] = useState("proxima-vara");
  const [codeFont, setCodeFont] = useState("berkeley-mono");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Visual Options</h2>

        <div className="space-y-6">
          {/* Boring Theme */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label className="text-base font-medium">
                Boring Theme
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                If you think the pink is too much, turn this on to tone it down.
              </p>
            </div>
            <Switch checked={boringTheme} onCheckedChange={setBoringTheme} />
          </div>

          {/* Hide Personal Information */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label className="text-base font-medium">
                Hide Personal Information
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Hides your name and email from the UI.
              </p>
            </div>
            <Switch
              checked={hidePersonalInfo}
              onCheckedChange={setHidePersonalInfo}
            />
          </div>

          {/* Disable Thematic Breaks */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label className="text-base font-medium">
                Disable Thematic Breaks
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Hides horizontal lines in chat messages. (Some browsers have
                trouble rendering these, turn off if you have bugs with
                duplicated lines)
              </p>
            </div>
            <Switch
              checked={disableThematicBreaks}
              onCheckedChange={setDisableThematicBreaks}
            />
          </div>

          {/* Stats for Nerds */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label className="text-base font-medium">
                Stats for Nerds
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Enables more insights into message stats including tokens per
                second, time to first token, and estimated tokens in the
                message.
              </p>
            </div>
            <Switch
              checked={statsForNerds}
              onCheckedChange={setStatsForNerds}
            />
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Main Text Font */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              Main Text Font
            </Label>
            <p className="text-sm text-muted-foreground">
              Used in general text throughout the app.
            </p>
            <Select value={mainFont} onValueChange={setMainFont}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select main font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proxima-vara">
                  Proxima Vara (default)
                </SelectItem>
                <SelectItem value="system">System Font</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Code Font */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              Code Font
            </Label>
            <p className="text-sm text-muted-foreground">
              Used in code blocks and inline code in chat messages.
            </p>
            <Select value={codeFont} onValueChange={setCodeFont}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select code font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="berkeley-mono">
                  Berkeley Mono (default)
                </SelectItem>
                <SelectItem value="fira-code">Fira Code</SelectItem>
                <SelectItem value="source-code-pro">Source Code Pro</SelectItem>
                <SelectItem value="jetbrains-mono">JetBrains Mono</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fonts Preview */}
        <div className="space-y-4">
          <Label className="text-base font-medium">
            Fonts Preview
          </Label>

          {/* Preview Text */}
          <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
            <div className="bg-zinc-700 rounded-md p-3">
              <p className="text-white text-sm">
                Can you write me a simple hello world program?
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-white text-sm">Sure, here you go:</p>

              {/* Code Block */}
              <div className="bg-zinc-900 rounded-md p-3 border border-zinc-700">
                <div className="text-xs text-zinc-400 mb-2">typescript</div>
                <pre className="text-sm text-zinc-200 font-mono overflow-x-auto">
                  <code>{`function greet(name: string) {
  console.log('Hello, \${name}!');
  return true;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
