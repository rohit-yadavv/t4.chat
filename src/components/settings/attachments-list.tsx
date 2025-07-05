"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Paperclip, ExternalLink, Calendar, FileText } from 'lucide-react'
import { MessageType } from '@/types/message.type'

interface AttachmentsListProps {
  data: MessageType[] | null
}

const AttachmentsList = ({ data }: AttachmentsListProps) => {

  if (!data || data.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Attachments
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage all your message attachments
          </p>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <Paperclip className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <div className="mb-2">No attachments found</div>
          <div className="text-sm">
            Start attaching files to your messages to see them here
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileExtension = (url: string) => {
    try {
      const pathname = new URL(url).pathname
      const extension = pathname.split('.').pop()?.toLowerCase()
      return extension || 'img'
    } catch {
      return 'img'
    }
  }

  const getFileName = (url: string) => {
    try {
      const pathname = new URL(url).pathname
      return pathname.split('/').pop() || 'Unknown file'
    } catch {
      return 'Unknown file'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Attachments
        </h2>
        <p className="text-sm text-muted-foreground">
          View and manage all your message attachments ({data.length} total)
        </p>
      </div>

      {/* Attachments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((message) => (
          <Card key={message._id as string} className="border overflow-hidden border-border/50 bg-card hover:bg-card/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base overflow-hidden">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Paperclip className="w-4 h-4" />
                </div>
                <span className="truncate flex-1 min-w-0">{getFileName(message.attachment)}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* File Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    {getFileExtension(message.attachment).toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(message.createdAt.toString())}</span>
                </div>
              </div>

              {/* User Query Preview */}
              {message.userQuery && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">
                    Message:
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.userQuery}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(`/chat/${message.threadId}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(message.)}
                >
                  Copy URL
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AttachmentsList 