import React from 'react'
import { getAttachmentMessage } from '@/action/message.action'
import AttachmentsList from '@/components/settings/attachments-list'
import { MessageType } from '@/types/message.type'

const page = async () => {
  const { data, error } = await getAttachmentMessage()

  const filteredData = data?.filter((message: MessageType) => message.attachment && message.attachment.trim() !== '') || null
  
  return (
    <div className="p-4">
      <AttachmentsList data={filteredData} />
    </div>
  )
}

export default page
