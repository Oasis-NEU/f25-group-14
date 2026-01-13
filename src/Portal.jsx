import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const overlayRoot = document.getElementById("overlay-root");
  return createPortal(children, overlayRoot);
}