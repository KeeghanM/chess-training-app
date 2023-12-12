import Link from "next/link";
import Heading from "../../_elements/heading";

export default function Footer() {
  const sections: {
    title: string;
    links: {
      icon?: React.ReactNode;
      text: string;
      url: string;
    }[];
  }[] = [
    {
      title: "ChessTraining.app",
      links: [
        {
          text: "All Features",
          url: "/about/features",
        },
        {
          text: "Product Roadmap",
          url: "/product-roadmap",
        },
        {
          text: "Natural Play Learning",
          url: "/about/features/natural-play-learning",
        },
        {
          text: "Course Trainer",
          url: "/courses",
        },
        {
          text: "Tactics Trainer",
          url: "/training/tactics",
        },
        {
          text: "Knight Vision",
          url: "/training/knight-vision",
        },
        {
          text: "Endgame Trainer",
          url: "/training/endgames",
        },
        {
          text: "Visualisation & Calculation",
          url: "/training/visualisation",
        },
      ],
    },
    {
      title: "The Company",
      links: [
        {
          text: "Meet the team",
          url: "/about/meet-the-team",
        },
        {
          text: "About Us",
          url: "/about",
        },
        {
          text: "Our Mission",
          url: "/about#our-mission",
        },
        {
          text: "Our Vision",
          url: "/about#our-vision",
        },
        {
          text: "Our Values",
          url: "/about#our-values",
        },
        {
          text: "Our Culture",
          url: "/about#our-culture",
        },
        {
          text: "Our Story",
          url: "/about#our-story",
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          text: "Contact Us",
          url: "/contact",
        },
        {
          text: "Report an issue",
          url: "/contact/report-an-issue",
        },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white p-4 md:px-12 flex flex-col text-sm gap-4">
      <div className="flex flex-col md:flex-row justify-evenly gap-4 md:gap-6">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Heading as={"h3"}>{section.title}</Heading>
            {section.links.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="hover:underline flex items-center gap-2"
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center text-xs italic">
        <p>&copy; 2020-2023 ChessTraining.app</p>
      </div>
    </footer>
  );
}
