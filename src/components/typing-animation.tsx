"use client";

import { useState, useEffect } from 'react';

type TypingAnimationProps = {
  words: string[];
};

export function TypingAnimation({ words }: TypingAnimationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (!currentWord) return;
    
    const typingSpeed = isDeleting ? 75 : 150;

    const handleTyping = () => {
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );

      if (!isDeleting && text === currentWord) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, wordIndex, words]);

  // Cursor blink animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="text-primary relative inline-block">
      {text}
      <span
        className={`inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle transition-opacity duration-300 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  );
}
