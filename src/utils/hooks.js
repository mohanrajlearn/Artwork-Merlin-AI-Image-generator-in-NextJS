import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "@/components/UI/Link";
import { selectUser, selectUserLoading } from "@/store/slices/authSlice";
import {
  addToast,
  killToast,
  removeToast,
  setAlert,
  setConfirm,
} from "@/store/slices/uiSlice";
import { CircularProgress } from "@mui/material";

export function useToasts() {
  const dispatch = useDispatch();
  const [timeouts, setTimeouts] = useState([]);

  const dispatchMessage = (message, type) => {
    const duration = 3000;
    const animation_duration = 500;
    const id = Date.now();
    dispatch(addToast({ message, type, id }));
    const handle = setTimeout(() => {
      dispatch(removeToast({ id }));
    }, duration);
    const anihandle = setTimeout(() => {
      dispatch(killToast({ id }));
    }, duration - animation_duration);
    setTimeouts((outs) => [...outs, handle, anihandle]);
  };

  const $success = (message) => dispatchMessage(message, "success");
  const $error = (message) => dispatchMessage(message, "error");
  const $warning = (message) => dispatchMessage(message, "warning");
  const $info = (message) => dispatchMessage(message, "info");

  const $confirm = (message) => {
    dispatch(setConfirm({ q: message }));
    return new Promise((res, rej) => {
      window.addEventListener("confirm", (e) => {
        if (typeof e.detail == "boolean") {
          res(e.detail);
        } else {
          rej();
        }
      });
    });
  };
  const $alert = (message) => dispatch(setAlert({ q: message }));

  useEffect(() => {
    return () => {
      for (let timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return { $success, $error, $warning, $confirm, $alert, $info };
}

export function useAuth(ref, clickedOutside) {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {}, [user]);

  const fallBack = loading ? (
    <CircularProgress sx={{ color: "#F25920" }} />
  ) : (
    <div className=" flex justify-center items-center h-screen  -translate-y-12">
      <p className="flex items-center justify-center mr-1">Please {' '} </p>
      <div className="bg-primary py-1 px-4 rounded-md mx-3 text-white font-semibold">
        <Link href="/login" className={`text-white`}>
          Sign in
        </Link>
      </div>
      <p className="ml-1">to continue</p>
    </div>
  );

  return { user, fallBack };
}
