I will implement the native browser notification system so the app correctly requests permission and sends alerts even when the APK is installed.

### Changes:

1.  **Modify `use-game-store.ts`**:
    *   Add a logic to request `Notification.permission` when `toggleNotifications` is called.
    *   Update `addSystemMessage` to also trigger a `new Notification()` if permissions are granted and the tab is not focused (or always if that's what's expected for system alerts).
    *   Handle cases where the browser/platform doesn't support the Notification API.

2.  **Modify `Dashboard.tsx`**:
    *   Add a `useEffect` to check if notifications are enabled in settings but permission is denied/not requested yet, and prompt if appropriate.

### Technical Details:
- Use `if ('Notification' in window)` to check for support.
- Call `Notification.requestPermission()` in `toggleNotifications`.
- In `addSystemMessage`, add:
  ```javascript
  if (player.notificationsEnabled && Notification.permission === 'granted') {
    new Notification('Ascension System', { body: text, icon: '/favicon.ico' });
  }
  ```
- This will cause the browser (and the APK wrapper) to trigger the system permission dialog.