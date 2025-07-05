import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Lightbulb, 
  Bug, 
  AlertCircle, 
  MessageSquare, 
  Shield, 
  FileText 
} from 'lucide-react'

const ContactPage = () => {
  const supportOptions = [
    {
      icon: <Lightbulb className="h-6 w-6 text-pink-500" />,
      title: "Have a cool feature idea?",
      description: "Vote on upcoming features or suggest your own",
      action: () => console.log("Feature request")
    },
    {
      icon: <Bug className="h-6 w-6 text-pink-500" />,
      title: "Found a non-critical bug?",
      description: "UI glitches or formatting issues? Report them here :)",
      action: () => console.log("Bug report")
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
      title: "Having account or billing issues?",
      description: "Email us for priority support - support@ping.gg",
      action: () => window.open("mailto:support@ping.gg")
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
      title: "Want to join the community?",
      description: "Come hang out in our Discord! Chat with the team and other users",
      action: () => console.log("Discord invite")
    },
    {
      icon: <Shield className="h-6 w-6 text-pink-500" />,
      title: "Privacy Policy",
      description: "Read our privacy policy and data handling practices",
      action: () => console.log("Privacy policy")
    },
    {
      icon: <FileText className="h-6 w-6 text-pink-500" />,
      title: "Terms of Service",
      description: "Review our terms of service and usage guidelines",
      action: () => console.log("Terms of service")
    }
  ]

  return (
    <div className="max-w-2xl p-4 space-y-2">
      <h1 className="text-2xl font-bold text-foreground mb-8">
        We're here to help!
      </h1>
      
      <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-1 ">
        {supportOptions.map((option, index) => (
          <Card 
            key={index}
            className="transition-colors p-0 cursor-pointer"
           
          >
            <CardContent className="flex items-start gap-4 px-4 py-4">
              <div className="flex-shrink-0 mt-1">
                {option.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold">
                  {option.title}
                </h3>
                <p className=" text-sm">
                  {option.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ContactPage