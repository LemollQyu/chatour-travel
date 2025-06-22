"use client";
import { useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

const AccordionSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full border-t-[1.5px] py-2 border-dark">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-2 cursor-pointer"
      >
        <span className="text-sm font-medium">{title}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <ul className="flex flex-col gap-2 pt-5 pl-4  text-sm font-light text-dark">
          {items.map((item, i) => (
            <li
              key={i}
              className="group font-custom flex items-center gap-2 cursor-pointer px-2 py-1 "
            >
              <FiChevronRight className="group-hover:opacity-100 opacity-0 transition-all duration-300 transform group-hover:translate-x-1" />
              <span className="text-xs font-normal">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccordionSection;
