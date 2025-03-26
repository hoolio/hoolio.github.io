import runningImg from "/running/MtTamTrailRun.jpg";
import engineeringImg from "/engineering/BalsaEarthquakeTower.jpg";
import musicImg from "/music/music-cover-photo.jpg";
import writingImg from "/writing/writing-1.jpg";

export enum ProjectTitles {
  RUNNING = "Running",
  ENGINEERING = "Engineering",
  // LEGO = "Lego",
  MUSIC = "Music",
  WRITING = "Writing",
}

export const projects = [
  {
    title: ProjectTitles.RUNNING,
    subheader: "I love to run every week on the trails!",
    img: runningImg,
    content: "Trail-running is tough, competitive, and relaxing, all-in-one",
  },
  {
    title: ProjectTitles.ENGINEERING,
    subheader: "I love building, whether models or with code",
    img: engineeringImg,
    content: "I've used and loved working with computers all my life",
  },
  // {
  //   title: ProjectTitles.LEGO,
  //   subheader: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   img: placeholderImg,
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus.",
  // },
  {
    title: ProjectTitles.MUSIC,
    subheader: "Music is an important part of my life",
    img: musicImg,
    content: "I love making music, both on the piano and in software",
  },
  {
    title: ProjectTitles.WRITING,
    subheader: "I've grown up around books, and love reading and writing",
    img: writingImg,
    content: "",
  },
];
