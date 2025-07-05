import { redirect } from "next/navigation";

const page = () => {
  redirect("/settings/subscription");
};

export default page;