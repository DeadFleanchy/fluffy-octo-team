import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as math from "mathjs";

// Make math available globally for calculations
(window as any).math = math;

createRoot(document.getElementById("root")!).render(<App />);
