// Components
import TeamCarousel from "../TeamCarousel";

// Sections content data
const sectionsContentData = [
  {
    key: "about",
    title: "About us",
    content: (
      <p>
        The app was built during the wonderful Voyage #43 organized by Jim
        Medlock and his awesome Chingu team. Thanks to this opportunity we
        gained confidence and levelled up soft and technical skills to face any
        future challenges.
      </p>
    ),
  },
  { key: "team", title: "Our team", content: <TeamCarousel /> },
  { key: "credits", title: "Credits", content: <p>Credits</p> },
];

export default sectionsContentData;
