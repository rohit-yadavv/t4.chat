import { Suspense } from "react";
import ChatContainer from "@/components/chat-cmp/chat-container";
function page() {
  return (
    <Suspense fallback={<div />}>
      <ChatContainer />
    </Suspense>
  );
}

export default page;
