"use client";

import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLoader } from "@/context/loader-context";
import { FileText, GitBranch } from "lucide-react";

const codeLines = [
  { text: "// Profile.tsx", indent: 0 },
  { text: "const Profile = () => {", indent: 0 },
  { text: "return (", indent: 1 },
  { text: "<>", indent: 2 },
  { text: "<Developer", indent: 3 },
  { text: 'name={"Luis Enrique Arteaga Ruiz"}', indent: 4 },
  { text: 'role={"Desarrollador Fullstack"}', indent: 4 },
  {
    text: "skills={['React','TypeScript','Nest.js']}",
    indent: 4,
  },
  { text: "status={'Ready to work'}", indent: 4 },
  { text: "/>", indent: 3 },
  { text: "</>", indent: 2 },
  { text: ")", indent: 1 },
  { text: "}", indent: 0 },
];

const highlightSyntax = (line: string): ReactNode[] => {
  const parts: ReactNode[] = [];
  let remainingLine = line;
  let key = 0;

  const rules: { regex: RegExp; color: string }[] = [
    { regex: /^(\/\/.*)/, color: "#6a9955" }, // Comments - verde
    {
      regex: /^\b(const|return|import|from|export|default|function|type|as)\b/,
      color: "#c586c0",
    }, // Keywords - morado
    { regex: /^(<[A-Z][a-zA-Z]*|<\/[a-zA-Z]*>)/, color: "#4ec9b0" }, // Component tags - cyan
    { regex: /^(<>|<\/>|\/>|\{|\}|=|>|\(|\)|\[|\]|'|,)/, color: "#d4d4d4" }, // Punctuation & Brackets - gris claro
    { regex: /^\b(name|role|skills|status)\b(?==)/, color: "#9cdcfe" }, // Props - azul claro
    { regex: /^(".*?"|'.*?')/, color: "#ce9178" }, // Strings - naranja
    { regex: /^\b([A-Z][a-zA-Z]*)\b/, color: "#4ec9b0" }, // Component names - cyan
  ];

  while (remainingLine.length > 0) {
    let matchFound = false;
    for (const rule of rules) {
      const match = remainingLine.match(rule.regex);
      if (match && match[0]) {
        parts.push(
          <span key={key++} style={{ color: rule.color }}>
            {match[0]}
          </span>
        );
        remainingLine = remainingLine.substring(match[0].length);
        matchFound = true;
        break;
      }
    }
    if (!matchFound) {
      // Find the start of the next potential match to segment plain text
      let nextMatchIndex = remainingLine.length;
      let nextRuleIndex = -1;

      for (let i = 0; i < rules.length; i++) {
        const match = remainingLine.substring(1).match(rules[i].regex);
        if (match && (match.index || 0) < nextMatchIndex) {
          nextMatchIndex = (match.index || 0) + 1;
          nextRuleIndex = i;
        }
      }

      const plainText = remainingLine.substring(0, nextMatchIndex);
      if (plainText) {
        parts.push(
          <span key={key++} style={{ color: "#d4d4d4" }}>
            {plainText}
          </span>
        );
        remainingLine = remainingLine.substring(nextMatchIndex);
      }
    }
  }

  return parts;
};

export function PreLoader() {
  const { isLoading, setIsLoading } = useLoader();
  const [isMounted, setIsMounted] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  const [lines, setLines] = useState<ReactNode[][]>(
    Array(codeLines.length).fill([])
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const [showTerminal, setShowTerminal] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [showBuild, setShowBuild] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Trigger entrance animation after mount
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Code typing animation
  useEffect(() => {
    if (!isLoading || currentLineIndex >= codeLines.length) {
      if (currentLineIndex >= codeLines.length) {
        const timer = setTimeout(() => {
          setShowTerminal(true);
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const currentLineText = codeLines[currentLineIndex].text;
    const typingSpeed = 15;

    const typingTimeout = setTimeout(() => {
      if (currentCharIndex < currentLineText.length) {
        const newLine = currentLineText.substring(0, currentCharIndex + 1);
        setLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = highlightSyntax(newLine);
          return newLines;
        });
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentCharIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [isLoading, currentLineIndex, currentCharIndex]);

  // Terminal command typing animation
  useEffect(() => {
    if (!showTerminal) return;

    const command = "npm run build";
    const typingSpeed = 100;

    if (typedCommand.length < command.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(command.substring(0, typedCommand.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowCursor(false);
        setShowBuild(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showTerminal, typedCommand]);

  // Build and exit animation
  useEffect(() => {
    if (showBuild) {
      const timer = setTimeout(() => {
        setBuildComplete(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showBuild]);

  useEffect(() => {
    if (buildComplete) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [buildComplete, setIsLoading]);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#1e1e1e] font-code transition-all duration-700 ease-out",
        isLoading
          ? isEntering
            ? "opacity-0"
            : "opacity-100"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-[95%] sm:w-11/12 md:w-10/12 lg:w-11/12 max-w-4xl rounded-lg bg-[#1e1e1e] shadow-2xl transition-all duration-700 ease-out transform flex flex-col h-[85vh] sm:h-[75vh] md:h-[70vh] lg:h-[60vh] min-h-[300px] sm:min-h-[400px] md:min-h-[450px] max-h-[95vh] sm:max-h-[700px] border border-[#3e3e42] mx-2 sm:mx-4",
          isLoading
            ? isEntering
              ? "scale-90 opacity-0 translate-y-12 blur-sm"
              : "scale-100 opacity-100 translate-y-0 blur-0"
            : "scale-105 opacity-0 translate-y-[-20px] blur-sm"
        )}
      >
        {/* Header - Cursor style */}
        <div className="flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#252526] flex-shrink-0 rounded-t-lg border-b border-[#3e3e42]">
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-grow flex justify-center text-xs sm:text-sm text-[#cccccc]">
            <div className="bg-[#1e1e1e] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-t-md flex items-center gap-1.5 sm:gap-2 border-t border-x border-[#3e3e42]">
              <FileText size={12} className="sm:w-[14px] sm:h-[14px] text-[#858585]" />
              <span className="text-[#cccccc] truncate">profile.tsx</span>
            </div>
          </div>
        </div>

        {/* Code & Terminal Area */}
        <div className="flex-grow p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-[#d4d4d4] overflow-y-auto flex flex-col bg-[#1e1e1e]">
          <div className="flex-grow pr-1 sm:pr-2 overflow-y-auto overflow-x-auto">
            {lines.map((line, index) => (
              <div key={index} className="flex whitespace-pre hover:bg-[#2a2d2e]/50 min-w-max">
                <span className="w-8 sm:w-10 text-right text-[#858585] pr-2 sm:pr-4 select-none text-[10px] sm:text-xs">
                  {index + 1}
                </span>
                <span
                  className="text-[#d4d4d4]"
                  style={{ paddingLeft: `${codeLines[index].indent * 1}rem` }}
                >
                  {line}
                </span>
                {currentLineIndex === index && !showTerminal && (
                  <span className="inline-block w-0.5 h-4 sm:h-5 bg-[#aeafad] animate-cursor-blink align-bottom ml-0.5"></span>
                )}
              </div>
            ))}
          </div>

          {/* Terminal - Cursor style */}
          <div className="border-t border-[#3e3e42] pt-1.5 sm:pt-2 flex-shrink-0 mt-auto bg-[#1e1e1e]">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-3 text-[10px] sm:text-xs text-[#858585] border-b border-[#3e3e42] overflow-x-auto">
              <span className="text-[#cccccc] border-b-2 border-[#007acc] pb-1.5 sm:pb-2 font-medium whitespace-nowrap">
                TERMINAL
              </span>
              <span className="pb-1.5 sm:pb-2 text-[#858585] hover:text-[#cccccc] cursor-pointer whitespace-nowrap">OUTPUT</span>
              <span className="pb-1.5 sm:pb-2 text-[#858585] hover:text-[#cccccc] cursor-pointer whitespace-nowrap hidden sm:inline">DEBUG CONSOLE</span>
              <span className="pb-1.5 sm:pb-2 text-[#858585] hover:text-[#cccccc] cursor-pointer whitespace-nowrap hidden md:inline">PROBLEMS</span>
            </div>
            <div className="pt-2 sm:pt-3 md:pt-4 px-2 sm:px-3 pb-1.5 sm:pb-2 bg-[#1e1e1e]">
              {true && (
                <>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap">
                    <span className="text-[#4ec9b0]">➜</span>
                    <span className="text-[#4fc1ff] truncate">~/Luis-profile</span>
                    <span className="text-[#858585] whitespace-nowrap">
                      git:(<span className="text-[#c586c0]">main</span>)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm mt-1 flex-wrap">
                    <span className="text-[#d4d4d4]">$</span>
                    <span className="text-[#d4d4d4] break-all">{typedCommand}</span>
                    {showCursor && (
                      <span className="inline-block w-0.5 h-3 sm:h-4 bg-[#aeafad] animate-cursor-blink align-bottom"></span>
                    )}
                  </div>
                </>
              )}
              {showBuild && (
                <div className="mt-1.5 sm:mt-2 text-[#d4d4d4] text-xs sm:text-sm">
                  <p>
                    {buildComplete
                      ? "Build complete. Launching site..."
                      : "Building project..."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Cursor status bar style */}
        <div className="bg-[#007acc] text-[#ffffff] flex items-center justify-between px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 text-[10px] sm:text-xs flex-shrink-0 rounded-b-lg border-t border-[#3e3e42] overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <GitBranch size={12} className="sm:w-[14px] sm:h-[14px] text-[#ffffff]" />
            <span className="text-[#ffffff] whitespace-nowrap">main</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[#ffffff] flex-shrink-0">
            <span className="whitespace-nowrap">
              Ln {currentLineIndex > 0 ? codeLines.length : 1}, Col{" "}
              {currentCharIndex > 0
                ? codeLines[currentLineIndex - 1]?.text.length || 1
                : 1}
            </span>
            <span className="whitespace-nowrap hidden sm:inline">UTF-8</span>
            <span className="whitespace-nowrap hidden md:inline">TypeScript React</span>
          </div>
        </div>
      </div>
    </div>
  );
}
