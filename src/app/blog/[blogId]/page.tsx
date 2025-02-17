import React from "react";

const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;
  return <div>BlogDetailsPage for {blogId}</div>;
};

export default BlogDetailsPage;
