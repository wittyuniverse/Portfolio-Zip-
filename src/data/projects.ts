export type Project = {
  id: string;
  no: string;
  year: string;
  type: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  image?: string;
};

export type CreativeProject = {
  id: string;
  category: "poster" | "flyer" | "branding" | "social" | "print" | "digital";
  title: string;
  description: string;
  year: string;
  image: string;
  color: string;
};

export const caseStudies: Project[] = [
  {
    id: "gainscave",
    no: "01",
    year: "2024",
    type: "Brand Identity / Fitness",
    title: "Gainscave",
    description: "A visual identity built around discipline, strength and a premium fitness culture.",
    longDescription: "Gainscave is a personal brand identity project exploring how a fitness concept can feel premium, disciplined and visually distinctive. The work centres on a strong mark, restrained visual language and a system designed to translate across digital and physical touchpoints.",
    tags: ["Brand Identity", "Logo Design", "Fitness", "Visual Identity"],
    color: "#171717",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://www.behance.net/gallery/210947833/GAINSCAVE-LOGO-DESIGN",
  },
  {
    id: "bredren-media",
    no: "02",
    year: "2024",
    type: "Logo / Media Brand",
    title: "Bredren Media",
    description: "A logo exploration for a media brand, balancing personality with a clean, scalable mark.",
    longDescription: "Bredren Media is a logo design project focused on creating a memorable identity that can operate confidently across digital media, social content and branded communications. The approach prioritises clarity, recognition and a mark that remains strong at different sizes.",
    tags: ["Logo Design", "Branding", "Graphic Design", "Media"],
    color: "#111111",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://www.behance.net/gallery/210947695/BREDREN-MEDIA-LOGO-DESIGN",
  },
  {
    id: "pepsi-redesign",
    no: "03",
    year: "2024",
    type: "UX/UI / Web Design",
    title: "Pepsi Co. Redesign",
    description: "A conceptual digital experience exploring a stronger hero, product focus and contemporary interaction language.",
    longDescription: "A conceptual Pepsi web experience developed in Figma. The project explores a more expressive hero section, stronger visual hierarchy and a digital interface designed around product storytelling and high-impact brand moments.",
    tags: ["UX/UI", "Figma", "Web Design", "Digital Experience"],
    color: "#101827",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://www.behance.net/gallery/210947467/PEPSI-CO-Redesign-by-Pontsho-M",
  },
  {
    id: "vmtp-logistics",
    no: "04",
    year: "2024",
    type: "Web Design / Logistics",
    title: "VMTP Group",
    description: "A logistics-focused web concept combining automotive imagery, hierarchy and a strong digital first impression.",
    longDescription: "A web design concept for VMTP Group, built around the logistics and automotive sector. The work explores a high-impact hero section, structured information hierarchy and a visual system intended to make a technical business feel more modern and commercially compelling.",
    tags: ["Web Design", "Figma", "Logistics", "UX/UI"],
    color: "#141414",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://www.behance.net/gallery/210945739/LOGISTICS-PROJECT-FOR-VMTP-GROUP",
  },
  {
    id: "home-fitness",
    no: "05",
    year: "2024",
    type: "UX/UI / Product Design",
    title: "Home Fitness",
    description: "A fitness product concept designed around accessibility, movement and a focused digital experience.",
    longDescription: "Home Fitness is a digital product concept exploring how a focused interface can make training feel approachable and structured. The project combines product thinking, UI composition and visual storytelling into a coherent fitness experience.",
    tags: ["UX/UI", "Figma", "Product Design", "Fitness"],
    color: "#161616",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://www.behance.net/gallery/210944935/HOME-FITNESS-by-Pontsho-M",
  },
];

export const creativeProjects: CreativeProject[] = [
  {
    id: "gainscave-detail", category: "branding", title: "Gainscave — Identity", description: "Brand identity and logo exploration.", year: "2024",
    image: "https://image.thum.io/get/width/1200/crop/900/noanimate/https://www.behance.net/gallery/210947833/GAINSCAVE-LOGO-DESIGN", color: "#171717",
  },
  {
    id: "bredren-detail", category: "branding", title: "Bredren Media — Logo", description: "Media brand identity exploration.", year: "2024",
    image: "https://image.thum.io/get/width/1200/crop/900/noanimate/https://www.behance.net/gallery/210947695/BREDREN-MEDIA-LOGO-DESIGN", color: "#111111",
  },
  {
    id: "pepsi-detail", category: "digital", title: "Pepsi — Digital Redesign", description: "Conceptual UX/UI and web experience.", year: "2024",
    image: "https://image.thum.io/get/width/1200/crop/900/noanimate/https://www.behance.net/gallery/210947467/PEPSI-CO-Redesign-by-Pontsho-M", color: "#101827",
  },
  {
    id: "vmtp-detail", category: "digital", title: "VMTP Group — Web Concept", description: "Logistics and automotive web design.", year: "2024",
    image: "https://image.thum.io/get/width/1200/crop/900/noanimate/https://www.behance.net/gallery/210945739/LOGISTICS-PROJECT-FOR-VMTP-GROUP", color: "#141414",
  },
  {
    id: "home-fitness-detail", category: "digital", title: "Home Fitness — Product", description: "Fitness product UX/UI concept.", year: "2024",
    image: "https://image.thum.io/get/width/1200/crop/900/noanimate/https://www.behance.net/gallery/210944935/HOME-FITNESS-by-Pontsho-M", color: "#161616",
  },
];
