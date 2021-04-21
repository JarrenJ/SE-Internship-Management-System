import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const AutoLogOutController = (startTime) => {
  const [timer, setTimer] = useState(startTime);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    const resetTimeout = () => {
      setTimer(startTime);
    };
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }
    return () => {
      clearInterval(myInterval);
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
      }
    };
  });
  return timer;
};

export const AutoLogOut = () => {
  // 600 seconds => 10 minutes
  const timer = AutoLogOutController(600)
  // If timer is 0, logout the user
  if(timer === 0){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userID")
    window.location.reload(true)
  }
  return (
      <Dialog
          // Only open dialog if timer is less than 30 seconds
          open={timer < 30}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="auto-logout-dialog-title">Are You Still There?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Move your mouse or click a key to avoid being logged out.</p>
            <p>You will be logged out in <b>{timer}</b> seconds</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  )
}
