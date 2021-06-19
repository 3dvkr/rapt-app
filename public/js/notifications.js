const notificationBtn = document.getElementById("enable");
notificationBtn.addEventListener("click", askNotificationPermission);

// // Do an initial check to see what the notification permission state is

if (
  Notification.permission === "denied" ||
  Notification.permission === "default"
) {
  notificationBtn.style.display = "block";
} else {
  notificationBtn.style.display = "none";
}

// Function to check whether browser supports the promise version of requestPermission()
// Safari only supports the old callback-based version
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}

function askNotificationPermission() {
  // function to actually ask the permissions
  function handlePermission(permission) {
    // set the button to shown or hidden, depending on what the user answers
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      notificationBtn.style.display = "block";
    } else {
      notificationBtn.style.display = "none";
    }
  }

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      });
    } else {
      Notification.requestPermission(function (permission) {
        handlePermission(permission);
      });
    }
  }
}

// function for creating the notification
function createNotification(type) {
//   let img = "#";
  let notification = new Notification("Timer's done!", {
       body: `Your ${type} session is over. Head back to Rapt to log it.`,
        // icon: img 
    });

}


