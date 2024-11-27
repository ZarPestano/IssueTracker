"use client";
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />
});

const EditForm = ({ issue }: { issue?: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default EditForm;
