import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParameters = useSearchParams();

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
  ];

  const currentParams = await searchParams;
  const { status, orderBy } = await searchParams;

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const validOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus
    },
    orderBy: validOrderBy
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                className={column.className}
                key={column.value}
              >
                <NextLink
                  href={{
                    query: { ...currentParams, orderBy: column.value }
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy && <ArrowUpIcon />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic"; // forcing dynamic rendering
// export const revalidate = 0; // same as above

export default IssuesPage;
