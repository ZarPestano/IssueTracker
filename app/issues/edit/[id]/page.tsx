import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditForm from "../../_components/EditForm";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  });

  if (!issue) notFound();

  return <EditForm issue={issue} />;
};

export default EditIssuePage;
