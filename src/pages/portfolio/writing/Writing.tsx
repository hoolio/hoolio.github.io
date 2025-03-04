import { useState } from "react";

import "./index.css";
import { Button } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { MOBILE_WIDTH } from "../../../const";

const NOVEL_URL =
  "https://docs.google.com/document/d/1a1hWv3JrFJMvCu9vBN5Fs4WLEZ89kX250a7EOFI-DO4/edit?usp=sharing";

const Writing = () => {
  const isMobileWidth = window.innerWidth <= MOBILE_WIDTH;

  const [currentPage, setCurrentPage] = useState(0);

  const numPages = 4;

  const back = () => {
    setCurrentPage(currentPage - 1);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const isFlipped = (pageNumber: number) => pageNumber < currentPage;

  const pageButtonSx = { color: "white", borderColor: "white" };

  const pageClasses =
    "page absolute w-1/2 h-full bg-amber-50 right-0 inset-shadow-sm overflow-hidden";

  return (
    <div className="w-screen h-screen bg-amber-700 p-4 lg:p-20 flex flex-col items-center justify-center">
      <div
        className="book relative w-full lg:w-5/6 h-1/2 lg:h-full text-black"
        style={{ perspective: "1000px" }}
      >
        <div
          className={`z-50 ${pageClasses} ${
            isFlipped(0) && "flipped"
          } flex items-center justify-center`}
        >
          <p className="page-content text-2xl lg:text-4xl lg:pb-60 flex items-center">
            Writing
          </p>
        </div>
        <div className={`z-40 ${pageClasses} ${isFlipped(1) && "flipped"}`}>
          <p className="page-content lg:text-2xl p-4 lg:p-10">
            Reading and writing have always played big roles in my life. My
            house is busting with books, and at any moment, people in my family
            are usually either reading or reading out loud to one another. We've
            gone through many an entire book series out loud with my dad.
          </p>
        </div>
        <div className={`z-30 ${pageClasses} ${isFlipped(2) && "flipped"}`}>
          <p className="page-content lg:text-2xl p-4 lg:p-10">
            Recently, I've been working on translating my inspiration into
            writing and have been working on a book of my own. It's a fantasy
            novel set in a land ruled by three very different peoples from three
            very different homelands. People form special sorts of bonds with
            animals. <br />
            <br />
            Check out the next page for my first excerpt!
          </p>
        </div>
        <div className={`z-20 ${pageClasses} ${isFlipped(3) && "flipped"}`}>
          <div className="page-content p-4 lg:p-10 font-serif">
            <div className="lg:text-xl">
              <u>Chapter 1</u>
              <p className="lg:text-lg py-4">
                Nero woke up to the sounds of fighting, as he always did when he
                was home in Lapar. Here, everyone got up early to train. Nero
                pushed away the blanket and the last, clinging bits of a dream.
                Had he been falling? Nero rolled out of bed and hopped onto the
                cold stone floor. At the foot of the bed, atop an ancient, heavy
                brown trunk carved with flowering vines and what looked like
                little plant people, he saw a package wrapped in white linen and
                tan leather straps. Inside, he found the clothing that his
                father had sent to be worn that day. There was a note in Szman's
                tight, controlled handwriting, his father's personal secretary.
                “Put it on,” it said ...
              </p>
              <div className="mt-4">
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    fontSize: isMobileWidth ? "0.6rem" : "1rem",
                  }}
                  endIcon={!isMobileWidth && <LaunchIcon />}
                  href={NOVEL_URL}
                  target="_blank"
                >
                  Read the rest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-3/4 lg:w-1/4 mt-8 justify-between">
        <Button
          variant="outlined"
          disabled={currentPage <= 0}
          sx={pageButtonSx}
          onClick={back}
        >
          Prev page
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage >= numPages - 1}
          sx={pageButtonSx}
          onClick={next}
        >
          Next page
        </Button>
      </div>
    </div>
  );
};

export default Writing;
