import axios from 'axios';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function subscribePush() {
  const vapidPublicKey = 'BKQf8Mte3-Z3SpP-I-uTVTNXrxUd6n6ho-rpqO64YpXSuOLvomtsZkjCSC_hSY_RmJQt10ob3QxKl3-fricd60I';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  navigator.serviceWorker.ready.then((registration) => {
    if (!registration.pushManager) {
      alert('Push Unsupported');
      return;
    }

    registration.pushManager
      .subscribe({
        userVisibleOnly: true, // Always display notifications
        applicationServerKey: convertedVapidKey,
      })
      .then((subscription) => {
        console.log("push suscription success", subscription);
        axios.post('push/register', subscription);
      })
      .catch(err => console.log('Push subscription error: ', err));
  });
}
