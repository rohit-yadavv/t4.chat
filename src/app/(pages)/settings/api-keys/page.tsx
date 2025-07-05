"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { updateOpenRouterApiKey } from '@/action/user.action'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner'
import userStore from '@/stores/user.store'
import { encrypt } from '@/lib/secure-pwd'

const page = () => {
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const queryClient = useQueryClient()
  const {userData} = userStore()


  // Set the API key when user data is loaded
  useEffect(() => {
    if (userData?.openRouterApiKey) {
      console.log(userData.openRouterApiKey)
      setApiKey(userData.openRouterApiKey)
    }
  }, [userData?.openRouterApiKey])

  const { mutate: updateOpenRouterApiKeyMutation } = useMutation({
    mutationFn: (apiKey: string) => updateOpenRouterApiKey(encrypt(apiKey)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('API key updated successfully')
      setOpen(false)
    },
    onError: () => {
      toast.error('Failed to update API key')
    },
  })

  const handleSubmit = () => {
    if (apiKey.trim()) {
      updateOpenRouterApiKeyMutation(apiKey)
    } else {
      toast.error('Please enter a valid API key')
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys for external services
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>OpenRouter API Keys</CardTitle>
              <CardDescription>
                Add your OpenRouter API key to enable AI model access
              </CardDescription>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add API Key
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add OpenRouter API Key</DialogTitle>
                  <DialogDescription>
                    Enter your OpenRouter API key to connect your account
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="sk-or-v1-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    You can find your API key in your{' '}
                    <a 
                      href="https://openrouter.ai/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      OpenRouter dashboard
                    </a>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add API Key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <div className="mb-2">No API keys configured</div>
              <div className="text-sm">
                Click "Add API Key" to get started
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page