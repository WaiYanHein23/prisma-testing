import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      This is User Page
      {JSON.stringify(session)}
    </div>
  );
}
