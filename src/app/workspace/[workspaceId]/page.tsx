interface WorkspacePageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspacePage = ({ params }: WorkspacePageProps) => {
  return <div>ID: {params.workspaceId}</div>;
};

export default WorkspacePage;
