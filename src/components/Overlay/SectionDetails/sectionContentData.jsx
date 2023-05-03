// Components
import TeamCarousel from "../TeamCarousel";

// Sections content data
const sectionsContentData = [
  {
    key: "about",
    title: "About us",
    content: (
      <p>
        Welcome to our 3D portfolio, created during Voyage #43 on the Chingu
        platform! This experience helped us boost our confidence and develop our
        soft and technical skills, gearing us up for future challenges. Check it
        out and witness the amazing outcome of our teamwork! 📱✨🎉
      </p>
    ),
  },
  { key: "team", title: "Our team", content: <TeamCarousel /> },
  {
    key: "credits",
    title: "Credits",
    content: (
      <ul className="credits">
        <li>
          <a href="https://www.chingu.io/">Chingu</a>
        </li>
        <li>
          <a href="https://threejs-journey.com/">Bruno Simon</a>
        </li>
        <li>
          <a href="https://poly.pizza">Poly Pizza</a>
        </li>
        <li>
          <a href="https://www.syntystudios.com">Synty Studios</a>
        </li>
        <li>
          <a href="https://streakbyte.com">Streak Byte</a>
        </li>
        <li>
          <a href="https://github.com/chingu-voyages/v43-tier3-team-29">
            More Credits
          </a>
        </li>
      </ul>
    ),
  },
];

export default sectionsContentData;
