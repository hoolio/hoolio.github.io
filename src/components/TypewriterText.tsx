import { useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  startDelay?: number; // How long to wait before starting to type in ms
  speed?: number; // Time per character in ms
  className?: string;
}

const TypewriterText: React.FC<TypewriterProps> = ({
  text,
  startDelay = 0,
  speed = 20,
  className = "",
}) => {
  const ref = useRef(null);

  // True when the element appears on the page.
  const isInView = useInView(ref, { once: true });

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let interval: NodeJS.Timeout;
    setTimeout(() => {
      // Every [speed] ms, update the displayed text to include the next
      // character. Do this until all text is displayed.
      interval = setInterval(() => {
        setDisplayedText((prev) => text.substring(0, prev.length + 1));

        if (displayedText === text) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => clearInterval(interval);
  }, [text, speed, isInView]);

  return (
    <p
      ref={ref}
      className={className}
      // We want to respect any tags in the text such as <i>. It's okay to
      // dangerously set because the text is coming from us, not anyone else.
      dangerouslySetInnerHTML={{ __html: displayedText }}
    ></p>
  );
};

export default TypewriterText;
