export { default } from "next-auth/middleware"

// export const config = { matcher: ["/dashboard",'/dashboard/blogs','/dashboard/projects','/dashboard/message'] }

export const config = {
    matcher: ["/dashboard/:path*"],
  };