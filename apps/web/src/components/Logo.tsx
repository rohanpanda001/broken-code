import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "md" | "xl";
  showText?: boolean;
  glitchText?: boolean;
  layout?: "horizontal" | "vertical";
}

export default function Logo({ 
  className = "", 
  size = "md", 
  showText = true,
  glitchText = false,
  layout = "horizontal"
}: LogoProps) {
  const sizeClasses = {
    md: { brace: "text-3xl", zap: "w-5 h-5 mt-1", text: "text-xl" },
    xl: { brace: "text-6xl md:text-8xl", zap: "w-10 h-10 md:w-16 md:h-16 mt-1 md:mt-2", text: "text-6xl md:text-8xl" },
  };

  const s = sizeClasses[size];
  const textClass = glitchText ? "glitch" : "glitch-hover hidden sm:inline-block";
  const flexDir = layout === "vertical" ? "flex-col" : "flex-row";
  const textMargin = layout === "vertical" ? "mt-4 ml-0" : "ml-3";

  return (
    <div className={`flex items-center justify-center ${flexDir} ${className}`}>
      <div className="flex items-center justify-center gap-1 md:gap-2">
        <span className={`text-electric font-light ${s.brace}`}>{"{"}</span>
        <Zap className={`text-orange fill-orange animate-pulse ${s.zap}`} />
        <span className={`text-electric font-light ${s.brace}`}>{"}"}</span>
      </div>
      
      {showText && (
        <span 
          className={`${textMargin} text-cloud font-bold tracking-tight ${textClass} ${s.text}`} 
          data-text="Broken Code"
        >
          Broken Code
        </span>
      )}
    </div>
  );
}
