import hero from "@/assets/navratri-hero.jpg";
import dance from "@/assets/navratri-dance.jpg";
import dj from "@/assets/navratri-dj.jpg";
import crowd from "@/assets/navratri-crowd.jpg";
import food from "@/assets/navratri-food.jpg";
import lights from "@/assets/navratri-lights.jpg";
import logoUnifest from "@/assets/logo-unifest.png";
import logoKalpam from "@/assets/logo-kalpam.png";
import logoKalpamTransparent from "@/assets/logo-kalpam-transparent.png";

// Confirmed facts are from the official banners; unspecified details remain unconfirmed.
const bookingUrl = "https://in.bookmyshow.com/activities/the-great-indian-dandiya-night-season-2-0/ET00519277";
export const festival = {
  brand: "DANDIYA NIGHT",
  eventName: "The Great Indian Dandiya Night Season 2.0",
  organizer: "Kalpam Events",
  organizerLogo: logoKalpam,
  organizerLogoTransparent: logoKalpamTransparent,
  organizerInstagram: "https://www.instagram.com/kalpamevents",
  organizerHandle: "@kalpamevents",
  outreachPartner: "Unifest Entertainment",
  outreachPartnerLogo: logoUnifest,
  outreachPartnerInstagram: "https://www.instagram.com/unifest_entertainments",
  outreachPartnerHandle: "@unifest_entertainments",
  logos: {
    kalpam: logoKalpam,
    kalpamTransparent: logoKalpamTransparent,
    unifest: logoUnifest,
  },
  digitalPartner: "SO Digital",
  madeBy: "Somil Mittal",
  year: "2026",
  city: "Jaipur",
  dates: "11—19 OCTOBER 2026",
  venue: "Entertainment Paradise",
  address: "Entertainment Paradise, Jawahar Circle Bypass, Tonk Road, Jaipur, Rajasthan 302017",
  openingTime: "7 PM onwards",
  ticketPrice: "₹299 onwards",
  parking: "Parking available at venue premises.",
  entry: "Early bird tickets start from ₹299. Valid for one day entry (11–19 October · 7 PM onwards).",
  contactNumbers: ["79760 40951", "77426 49943"],
  bookingUrl,
  mapsUrl: "https://maps.google.com/?cid=8575402093557401768",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5331.065457167885!2d75.79311974891529!3d26.83493657164815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dcb6487461483%3A0x7702a39b617948a8!2sEntertainment%20Paradise!5e0!3m2!1sen!2sin!4v1790664122964!5m2!1sen!2sin",
  instagramUrl: "https://www.instagram.com/kalpamevents",
  images: { hero, dance, dj, crowd, food, lights },
  tracks: [
    { title: "Kesariyo Rang", artist: "Traditional Garba Anthem", src: "/audio/Kesariyo%20Rang.mp3", art: dance },
    { title: "Sanedo Lal Sanedo", artist: "Classic Dandiya Hit", src: "/audio/SANEDO%20LAL%20SANEDO.mp3", art: crowd },
    { title: "Rang Bhini Radha", artist: "Navratri Folk Celebration", src: "/audio/Rang%20Bhini%20Radha.mp3", art: hero },
    { title: "Tari Madh Mithi Mithi Vaate", artist: "Gujarati Garba Beats", src: "/audio/Tari%20Madh%20Mithi%20Mithi%20Vaate.mp3", art: dj },
    { title: "Navlaakhaai Lobadiyaliyu", artist: "Aadishakti Garba Special", src: "/audio/Navlaakhaai%20Lobadiyaliyu.mp4", art: lights },
  ],
  nights: [
    "11 OCT", "12 OCT", "13 OCT", "14 OCT", "15 OCT", "16 OCT", "17 OCT", "18 OCT", "19 OCT",
  ].map((date, index) => ({ date, theme: `Night ${String(index + 1).padStart(2, "0")}`, attraction: "Night-specific programme not announced", number: String(index + 1).padStart(2, "0"), artist: "Not announced", venue: "Entertainment Paradise, Jaipur", bookingUrl })),
  passes: [
    {
      id: "female-early-bird",
      name: "FEMALE - EARLY BIRD",
      price: "₹299",
      numericPrice: 299,
      tag: "POPULAR",
      description: "Single entry for female attendees",
      benefits: [
        "Valid for 1 female attendee",
        "Single-day entry · 7 PM onwards",
        "Full arena & DJ access",
        "Early bird discounted rate",
      ],
      bookingUrl,
    },
    {
      id: "male-early-bird",
      name: "MALE - EARLY BIRD",
      price: "₹499",
      numericPrice: 499,
      tag: "EARLY BIRD",
      description: "Single entry for male attendees",
      benefits: [
        "Valid for 1 male attendee",
        "Single-day entry · 7 PM onwards",
        "Full arena & DJ access",
        "Early bird discounted rate",
      ],
      bookingUrl,
    },
    {
      id: "couple-early-bird",
      name: "COUPLE - EARLY BIRD",
      price: "₹599",
      numericPrice: 599,
      tag: "BEST VALUE",
      description: "Entry for 1 couple (1 Female + 1 Male)",
      benefits: [
        "Valid for 1 couple entry",
        "Single-day entry · 7 PM onwards",
        "Save on individual tickets",
        "Dandiya arena & food zone access",
      ],
      bookingUrl,
    },
    {
      id: "female-group-4",
      name: "FEMALE GROUP OF 4 ENTRY",
      price: "₹999",
      numericPrice: 999,
      tag: "GROUP PASS",
      description: "Discounted entry for female squad of 4",
      benefits: [
        "Entry for 4 female guests",
        "Single-day entry · 7 PM onwards",
        "Just ~₹250 per person",
        "Perfect for girl gang celebration",
      ],
      bookingUrl,
    },
    {
      id: "male-group-4",
      name: "MALE GROUP OF 4 ENTRY",
      price: "₹1,199",
      numericPrice: 1199,
      tag: "GROUP PASS",
      description: "Discounted entry for group of 4 male friends",
      benefits: [
        "Entry for 4 male guests",
        "Single-day entry · 7 PM onwards",
        "Just ~₹300 per person",
        "Save big on group entry",
      ],
      bookingUrl,
    },
  ],
  reels: [
    { image: dance, caption: "The spin you came for ✨", views: "Preview reel 01" },
    { image: crowd, caption: "When the beat drops 🥢", views: "Preview reel 02" },
    { image: dj, caption: "Jaipur, are you ready? 🔊", views: "Preview reel 03" },
    { image: lights, caption: "After dark hits different ⚡", views: "Preview reel 04" },
  ],
  faqs: [
    { question: "What is included in the pass?", answer: "Early bird tickets start from ₹299 for Female entry, ₹499 for Male entry, ₹599 for Couples, ₹999 for Female Group of 4, and ₹1,199 for Male Group of 4. Each pass grants single-day admission from 7 PM onwards with full access to the dandiya arena and live DJ performances." },
    { question: "Can I buy tickets at the venue?", answer: "On-site availability is not guaranteed. We strongly recommend booking through BookMyShow before the early bird passes sell out." },
    { question: "How many tickets can I add?", answer: "You can add up to 10 tickets per booking on BookMyShow, or pick our Couple and Group of 4 packages for instant group discounts." },
    { question: "Is the event family friendly?", answer: "The banners do not specify an age or family entry policy. Please ask the organizers before booking." },
    { question: "What should I wear?", answer: "Come ready to move. Festive outfits, comfortable footwear and a little extra colour are always a good idea." },
    { question: "Is parking available?", answer: "Parking information is not listed on the official banners. Contact the organizers for details." },
    { question: "What time should I arrive?", answer: "The event is advertised as starting at 7 PM onwards. A separate gate-opening time is not listed." },
    { question: "Can I transfer my ticket?", answer: "Transfer terms are not stated on the banners. Check the official booking page for ticket conditions." },
  ],
};