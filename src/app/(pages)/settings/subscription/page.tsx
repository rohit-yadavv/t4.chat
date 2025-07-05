import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Logout from '@/components/logout'

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Core Features</h1>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Access to 300+ LLM Models */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-blue-500">🤖</span>
              300+ LLM Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access to over 300 large language models including Claude, GPT, Gemini, and many more cutting-edge AI models.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Image Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-purple-500">🎨</span>
              Image Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Generate stunning images with AI-powered image creation tools. Create artwork, illustrations, and visual content effortlessly.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Graph Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-500">📊</span>
              Graph Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create interactive charts, diagrams, and data visualizations. Perfect for presentations, reports, and data analysis.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

{/* 
      <div className="flex justify-start">
        <Button variant="t3" size="lg" className="px-8">
          Upgrade Now
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        * Premium credits are used for GPT Image Gen, Claude Sonnet, and Grok 3. Additional Premium credits can be purchased separately.
      </div> */}

      {/* Danger Zone */}
      <div className="mt-16 space-y-4">
        <h2 className="text-2xl font-bold">Danger Zone</h2>
        <p className="text-muted-foreground">
          Permanently delete your account and all associated data.
        </p>
        <Logout>
          <Button variant="destructive" size="default">
            Delete Account
          </Button>
        </Logout>
      </div>
    </div>
  )
}

export default page