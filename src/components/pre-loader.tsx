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
    { regex: /^(\/\/.*)/, color: "#6a9955" }, // Comments
    {
      regex: /^\b(const|return|import|from|export|default|function|type|as)\b/,
      color: "#c586c0",
    }, // Keywords
    { regex: /^(<[A-Z][a-zA-Z]*|<\/[a-zA-Z]*>)/, color: "#4ec9b0" }, // Component tags
    { regex: /^(<>|<\/>|\/>|\{|\}|=|>|\(|\)|\[|\]|'|,)/, color: "#d4d4d4" }, // Punctuation & Brackets
    { regex: /^\b(name|role|skills|status)\b(?==)/, color: "#9cdcfe" }, // Props
    { regex: /^(".*?"|'.*?')/, color: "#ce9178" }, // Strings
    { regex: /^\b([A-Z][a-zA-Z]*)\b/, color: "#4ec9b0" }, // Component names (e.g., Developer)
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
        "fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1117] transition-opacity duration-1000 font-code",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-11/12 max-w-4xl rounded-lg bg-[#1e1e1e] shadow-2xl transition-all duration-700 transform flex flex-col h-[60vh] min-h-[400px] max-h-[700px]",
          isLoading ? "scale-100 opacity-100" : "scale-125 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center p-3 bg-[#3c3c3c] flex-shrink-0 rounded-t-lg">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-grow flex justify-center text-sm text-gray-400">
            <div className="bg-[#2a2d2e] px-4 py-1.5 rounded-t-md flex items-center gap-2">
              <FileText size={14} className="text-gray-400" />
              <span>profile.tsx</span>
            </div>
          </div>
        </div>

        {/* Code & Terminal Area */}
        <div className="flex-grow p-4 text-sm text-[#d4d4d4] overflow-y-auto flex flex-col">
          <div className="flex-grow pr-2 overflow-y-auto">
            {lines.map((line, index) => (
              <div key={index} className="flex whitespace-pre">
                <span className="w-8 text-right text-gray-500 pr-4 select-none">
                  {index + 1}
                </span>
                <span
                  style={{ paddingLeft: `${codeLines[index].indent * 1.5}rem` }}
                >
                  {line}
                </span>
                {currentLineIndex === index && !showTerminal && (
                  <span className="inline-block w-0.5 h-5 bg-white animate-cursor-blink align-bottom ml-0.5"></span>
                )}
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="border-t border-[#3c3c3c] pt-2 flex-shrink-0 mt-auto">
            <div className="flex items-center gap-6 px-2 text-xs text-gray-400 border-b border-[#3c3c3c]">
              <span className="text-white border-b-2 border-white pb-2">
                TERMINAL
              </span>
              <span className="pb-2">OUTPUT</span>
              <span className="pb-2">DEBUG CONSOLE</span>
              <span className="pb-2">PROBLEMS</span>
            </div>
            <div className="pt-4 px-2">
              {true && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~/Luis-profile</span>
                    <span className="text-gray-400">
                      git:(<span className="text-purple-400">main</span>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>$</span>
                    <span>{typedCommand}</span>
                    {showCursor && (
                      <span className="inline-block w-0.5 h-4 bg-white animate-cursor-blink align-bottom"></span>
                    )}
                  </div>
                </>
              )}
              {showBuild && (
                <div className="mt-2 text-gray-300">
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

        {/* Footer */}
        <div className="bg-[#1f74b6] text-white flex items-center justify-between px-4 py-0.5 text-xs flex-shrink-0 rounded-b-lg">
          <div className="flex items-center gap-2">
            <GitBranch size={14} />
            <span>main</span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              Ln {currentLineIndex > 0 ? codeLines.length : 1}, Col{" "}
              {currentCharIndex > 0
                ? codeLines[currentLineIndex - 1]?.text.length || 1
                : 1}
            </span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </div>
        </div>
      </div>
    </div>
  );
}
