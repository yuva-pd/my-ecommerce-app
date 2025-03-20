import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/redux/slices/authSlice";

// AuthWatcher to manage login/logout actions based on session changes
function AuthWatcher() {
  const { data: session, status } = useSession(); // Get session data
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return; // Skip loading state
    if (session?.accessToken) {
      // Dispatch login if session contains accessToken
      dispatch(login({ accessToken: session.accessToken, user: session.user }));
    } else {
      // Dispatch logout if no accessToken
      dispatch(logout());
    }
  }, [session, dispatch, status]); // Re-run when session or status changes

  return null;
}

export default AuthWatcher;
