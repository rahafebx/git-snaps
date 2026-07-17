import { useEffect, useRef, useState, useCallback } from "react";
import {
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCcw,
  Download,
} from "lucide-react";
import mermaid from "mermaid";

// Mermaid component with zoom controls and centering
export const MermaidDiagram = ({ chart, isDark }) => {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const diagramRef = useRef(null);
  const isMounted = useRef(true);
  
  // Pan state for drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!chart) return;

      try {
        setIsRendering(true);
        setError(null);

        // Initialize Mermaid with theme based on your Tailwind config
        mermaid.initialize({
          theme: "base",
          // Additional theme variables for better consistency
          themeVariables: {
            // Common variables for both themes
            background: isDark ? "#18181b" : "#ffffff",
            mainBkg: isDark ? "#18181b" : "#ffffff",
            nodeBorder: isDark ? "#3b82f6" : "#0066ff",
            nodeTextColor: isDark ? "#e4e4e7" : "#18181b",
            lineColor: isDark ? "#6b7280" : "#9ca3af",
            tertiaryColor: isDark ? "#3f3f46" : "#e5e7eb",
            secondaryColor: isDark ? "#27272a" : "#f3f4f6",
            primaryColor: isDark ? "#3b82f6" : "#0066ff",
            primaryBorderColor: isDark ? "#3b82f6" : "#0066ff",
            primaryTextColor: isDark ? "#e4e4e7" : "#18181b",
            titleColor: isDark ? "#ffffff" : "#18181b",
            edgeLabelBackground: isDark ? "#18181b" : "#ffffff",
            clusterBkg: isDark ? "#18181b" : "#ffffff",
            clusterBorder: isDark ? "#3f3f46" : "#e5e7eb",
            // Font settings
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: "14px",
            // Specific diagram type variables
            gitInv1: isDark ? "#3b82f6" : "#0066ff",
            gitInv2: isDark ? "#3b82f6" : "#0066ff",
            gitBranchLabel0: isDark ? "#e4e4e7" : "#18181b",
            gitBranchLabel1: isDark ? "#e4e4e7" : "#18181b",
            gitBranchLabel2: isDark ? "#e4e4e7" : "#18181b",
            // Sequence diagram variables
            actorBorder: isDark ? "#3b82f6" : "#0066ff",
            actorBkg: isDark ? "#18181b" : "#ffffff",
            actorTextColor: isDark ? "#e4e4e7" : "#18181b",
            signalColor: isDark ? "#6b7280" : "#9ca3af",
            signalTextColor: isDark ? "#e4e4e7" : "#18181b",
            labelBoxBorderColor: isDark ? "#3b82f6" : "#0066ff",
            labelBoxBkgColor: isDark ? "#27272a" : "#f3f4f6",
            // Class diagram variables
            classText: isDark ? "#e4e4e7" : "#18181b",
            classBorder: isDark ? "#3b82f6" : "#0066ff",
            classBkg: isDark ? "#18181b" : "#ffffff",
            // State diagram variables
            stateBorder: isDark ? "#3b82f6" : "#0066ff",
            stateBkg: isDark ? "#18181b" : "#ffffff",
            stateText: isDark ? "#e4e4e7" : "#18181b",
          },
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
          sequence: {
            useMaxWidth: true,
            showSequenceNumbers: false,
          },
          gantt: {
            useMaxWidth: true,
          },
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (isMounted.current) {
          setSvg(renderedSvg);
          setError(null);
          setZoom(1);
          setPan({ x: 0, y: 0 }); // Reset pan when new diagram renders
        }
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        if (isMounted.current) {
          setError(
            "Failed to render diagram. Please check the Mermaid syntax.",
          );
          setSvg("");
        }
      } finally {
        if (isMounted.current) {
          setIsRendering(false);
        }
      }
    };

    renderMermaid();
  }, [chart, isDark]);

  // Mouse wheel zoom (only in fullscreen)
  const handleWheel = useCallback(
    (e) => {
      if (!isFullscreen) return;
      
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.min(Math.max(prev + delta, 0.3), 3));
    },
    [isFullscreen]
  );

  // Mouse down for drag (only in fullscreen)
  const handleMouseDown = useCallback(
    (e) => {
      if (!isFullscreen) return;
      
      // Only handle left click
      if (e.button !== 0) return;
      
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setPanStart({ x: pan.x, y: pan.y });
      
      // Prevent text selection during drag
      e.preventDefault();
    },
    [isFullscreen, pan]
  );

  // Mouse move for drag (only in fullscreen)
  const handleMouseMove = useCallback(
    (e) => {
      if (!isFullscreen || !isDragging) return;
      
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setPan({
        x: panStart.x + deltaX,
        y: panStart.y + deltaY,
      });
    },
    [isFullscreen, isDragging, dragStart, panStart]
  );

  // Mouse up to end drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for pan and zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only attach wheel listener if fullscreen
    if (isFullscreen) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      // Change cursor to grab when in fullscreen
      container.style.cursor = "grab";
    } else {
      // Reset cursor when not in fullscreen
      container.style.cursor = "default";
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isFullscreen, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.3));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Toggle fullscreen (CSS-based, not browser fullscreen)
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      if (prev) {
        setPan({ x: 0, y: 0 });
        setZoom(1);
        setIsDragging(false);
      }
      return !prev;
    });
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isFullscreen) {
        setPan({ x: 0, y: 0 });
        setZoom(1);
        setIsDragging(false);
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Handle download as SVG
  const handleDownload = useCallback(() => {
    if (!svg) return;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagram-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svg]);

  // Handle download as PNG
  const handleDownloadPNG = useCallback(() => {
    if (!svg || !diagramRef.current) return;

    const svgElement = diagramRef.current.querySelector("svg");
    if (!svgElement) return;

    // Create a canvas and draw the SVG
    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();

    // Get SVG dimensions
    const bbox = svgElement.getBBox();
    const width = bbox.width || 800;
    const height = bbox.height || 600;

    canvas.width = width * 2; // 2x for better quality
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");

    // Draw white background
    ctx.fillStyle = isDark ? "#18181b" : "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `diagram-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [svg, isDark]);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-4 my-6">
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  if (isRendering || !svg) {
    return (
      <div className="flex items-center justify-center py-12 my-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
        <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
          Rendering diagram...
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={toggleFullscreen}
        />
      )}
      
      <div
        ref={containerRef}
        className={`my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-4 z-50 rounded-xl shadow-2xl"
            : "relative"
        }`}
        style={{
          ...(isFullscreen && {
            width: "auto",
            height: "auto",
          }),
          cursor: isFullscreen ? (isDragging ? "grabbing" : "grab") : "default",
          userSelect: isFullscreen ? "none" : "auto",
        }}
      >
        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400"
              title="Download as SVG"
              aria-label="Download as SVG"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownloadPNG}
              className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-400 text-xs font-medium"
              title="Download as PNG"
              aria-label="Download as PNG"
            >
              PNG
            </button>
          </div>
        </div>

        {/* Diagram Container */}
        <div
          ref={diagramRef}
          className="p-8 flex items-center justify-center overflow-hidden"
          style={{
            minHeight: isFullscreen ? "calc(100vh - 120px)" : "300px",
            maxHeight: isFullscreen ? "calc(100vh - 120px)" : "700px",
            height: isFullscreen ? "calc(100vh - 120px)" : "auto",
          }}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease",
              maxWidth: "100%",
              willChange: "transform",
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        {/* Footer with diagram info */}
        <div className="px-4 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-400 text-center font-mono">
            {isFullscreen
              ? "🖱️ Use mouse wheel to zoom • Click and drag to pan • Press ESC to exit"
              : "Click the maximize button to enable zoom and pan"}
          </p>
        </div>
      </div>
    </>
  );
};