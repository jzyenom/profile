import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./InstallPrompt.css";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setShowInstall(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => setShowInstall(false);

  if (!showInstall) return null;

  return (
    <div className="install-banner top">
      <div className="install-text">
        <h3>Install Cornerstone Beef App</h3>
        <p>Get quick access from your home screen.</p>
      </div>
      <div className="install-actions">
        <button className="install-button" onClick={handleInstallClick}>
          Install
        </button>
        <button
          className="close-button"
          onClick={handleDismiss}
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
