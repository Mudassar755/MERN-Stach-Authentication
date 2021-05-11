import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import {RootState} from '../redux/Reducers'

const ToastifyAlert = () => {
    console.log("hellooo")
  const alerts = useSelector((state:RootState) => state.alert);
  console.log("alerts", alerts)
  useEffect(() => {
    alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert:any) => {
        if (alert.alertType === "error") {
          toast.error(alert.msg);
          return true;
        } else if (alert.alertType === "success") {
          toast.success(alert.msg);
          return true;
        } else {
          toast.warning(alert.msg);
          return true;
        }
      });
  }, [alerts]);

  return (
    <div>
      <ToastContainer
        // key={alert.id}
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        // pauseOnVisibilityChange={false}
        draggable={true}
        pauseOnHover={true}
    //    progress= {undefined}
      />
    </div>
  );
};

export default ToastifyAlert;
