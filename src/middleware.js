import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Admin route protection
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }

      // User route protection (if needed)
      if (req.nextUrl.pathname.startsWith("/user")) {
        return !!token; // Just checks if authenticated
      }

      // Default fallback
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/user"],
};
