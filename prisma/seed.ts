import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IMG = {
  nonmetal: "/elements/gas.png",
  noble: "/elements/gas.png",
  alkali: "/elements/metal.png",
  alkaline: "/elements/metal.png",
  metalloid: "/elements/crystal.png",
  metal: "/elements/metal.png",
  transition: "/elements/science.png",
  lanthanide: "/elements/crystal.png",
  actinide: "/elements/radioactive.png",
  unknown: "/elements/science.png",
  gold: "/elements/gold.png",
  mercury: "/elements/liquid.png"
};

const elements = [
  { id: "1", name: "Hydrogen", symbol: "H", atomic: 1, category: "Nonmetal", price: 0.5, image: IMG.nonmetal, desc: "The genesis of matter. A colorless, highly flammable gas that powers the stars." },
  { id: "2", name: "Helium", symbol: "He", atomic: 2, category: "Noble Gas", price: 12, image: IMG.noble, desc: "The second most abundant element, forged in stellar fusion. Inert, light, and cold." },
  { id: "3", name: "Lithium", symbol: "Li", atomic: 3, category: "Alkali Metal", price: 95, image: IMG.alkali, desc: "The lightest metal. Highly reactive and vital for modern energy storage." },
  { id: "4", name: "Beryllium", symbol: "Be", atomic: 4, category: "Alkaline Earth Metal", price: 450, image: IMG.alkaline, desc: "A steel-gray, strong, lightweight metal used in aerospace and high-end optics." },
  { id: "5", name: "Boron", symbol: "B", atomic: 5, category: "Metalloid", price: 5, image: IMG.metalloid, desc: "A rare metalloid found in Earth's crust. Essential for glass and ceramics." },
  { id: "6", name: "Carbon", symbol: "C", atomic: 6, category: "Nonmetal", price: 2, image: IMG.metal, desc: "The building block of life. From coal to diamond, it defines organic existence." },
  { id: "7", name: "Nitrogen", symbol: "N", atomic: 7, category: "Nonmetal", price: 0.3, image: IMG.nonmetal, desc: "Comprising 78% of Earth's atmosphere. A stable gas essential for biological structures." },
  { id: "8", name: "Oxygen", symbol: "O", atomic: 8, category: "Nonmetal", price: 0.4, image: IMG.nonmetal, desc: "The sustainer of aerobic life. Highly reactive and found in every breath." },
  { id: "9", name: "Fluorine", symbol: "F", atomic: 9, category: "Nonmetal", price: 180, image: IMG.nonmetal, desc: "The most electronegative element. Extremely reactive and dangerous in its pure form." },
  { id: "10", name: "Neon", symbol: "Ne", atomic: 10, category: "Noble Gas", price: 35, image: IMG.noble, desc: "The gas of the city lights. Inert and brilliant under electrical discharge." },
  { id: "11", name: "Sodium", symbol: "Na", atomic: 11, category: "Alkali Metal", price: 3, image: IMG.alkali, desc: "A soft, silvery-white metal that reacts violently with water." },
  { id: "12", name: "Magnesium", symbol: "Mg", atomic: 12, category: "Alkaline Earth Metal", price: 4, image: IMG.alkaline, desc: "Lightweight and strong. It burns with a brilliant white light." },
  { id: "13", name: "Aluminium", symbol: "Al", atomic: 13, category: "Metal", price: 2.5, image: IMG.metal, desc: "The third most abundant element. Lightweight, non-toxic, and infinitely recyclable." },
  { id: "14", name: "Silicon", symbol: "Si", atomic: 14, category: "Metalloid", price: 0.5, image: IMG.metalloid, desc: "The heart of modern technology. A semiconductor found in every circuit." },
  { id: "15", name: "Phosphorus", symbol: "P", atomic: 15, category: "Nonmetal", price: 0.8, image: IMG.nonmetal, desc: "Essential for DNA and cellular energy. Exists in red and highly reactive white forms." },
  { id: "16", name: "Sulfur", symbol: "S", atomic: 16, category: "Nonmetal", price: 0.1, image: IMG.nonmetal, desc: "A bright yellow nonmetal. Essential for proteins and used throughout industry." },
  { id: "17", name: "Chlorine", symbol: "Cl", atomic: 17, category: "Nonmetal", price: 0.2, image: IMG.nonmetal, desc: "A pale yellow-green gas. A powerful disinfectant and part of common table salt." },
  { id: "18", name: "Argon", symbol: "Ar", atomic: 18, category: "Noble Gas", price: 1.5, image: IMG.noble, desc: "The most common noble gas on Earth. Used in lighting and inert welding." },
  { id: "19", name: "Potassium", symbol: "K", atomic: 19, category: "Alkali Metal", price: 14, image: IMG.alkali, desc: "A soft alkali metal. Essential for nerve function and agricultural fertilizers." },
  { id: "20", name: "Calcium", symbol: "Ca", atomic: 20, category: "Alkaline Earth Metal", price: 2, image: IMG.alkaline, desc: "The fifth most abundant element in Earth's crust. The core of bones and stone." },
  { id: "21", name: "Scandium", symbol: "Sc", atomic: 21, category: "Transition Metal", price: 3400, image: IMG.transition, desc: "A rare transition metal used in aerospace and high-intensity lighting." },
  { id: "22", name: "Titanium", symbol: "Ti", atomic: 22, category: "Transition Metal", price: 6, image: IMG.transition, desc: "Strong as steel but 45% lighter. Exceptionally resistant to corrosion." },
  { id: "23", name: "Vanadium", symbol: "V", atomic: 23, category: "Transition Metal", price: 25, image: IMG.transition, desc: "A hard, silvery-grey metal used to create high-strength steel alloys." },
  { id: "24", name: "Chromium", symbol: "Cr", atomic: 24, category: "Transition Metal", price: 8, image: IMG.transition, desc: "The source of chrome. Highly polished and essential for stainless steel." },
  { id: "25", name: "Manganese", symbol: "Mn", atomic: 25, category: "Transition Metal", price: 2.2, image: IMG.transition, desc: "Vital for steel production and the photosynthetic process in plants." },
  { id: "26", name: "Iron", symbol: "Fe", atomic: 26, category: "Transition Metal", price: 0.1, image: IMG.transition, desc: "The backbone of civilization. The core of Earth and the carrier of oxygen in blood." },
  { id: "27", name: "Cobalt", symbol: "Co", atomic: 27, category: "Transition Metal", price: 40, image: IMG.transition, desc: "A hard, lustrous metal known for its deep blue compounds and high-strength magnets." },
  { id: "28", name: "Nickel", symbol: "Ni", atomic: 28, category: "Transition Metal", price: 18, image: IMG.transition, desc: "A silvery-white metal used in coins and high-temperature alloys." },
  { id: "29", name: "Copper", symbol: "Cu", atomic: 29, category: "Transition Metal", price: 9, image: IMG.transition, desc: "The conductor of human connectivity. Highly conductive, ductile, and antimicrobial." },
  { id: "30", name: "Zinc", symbol: "Zn", atomic: 30, category: "Transition Metal", price: 3, image: IMG.transition, desc: "A versatile metal used for galvanizing steel and as an essential biological cofactor." },
  { id: "31", name: "Gallium", symbol: "Ga", atomic: 31, category: "Metal", price: 600, image: IMG.metal, desc: "A soft metal that melts in your hand. Vital for semiconductors and LEDs." },
  { id: "32", name: "Germanium", symbol: "Ge", atomic: 32, category: "Metalloid", price: 1400, image: IMG.metalloid, desc: "A lustrous metalloid used in fiber optics and infrared spectroscopy." },
  { id: "33", name: "Arsenic", symbol: "As", atomic: 33, category: "Metalloid", price: 0.6, image: IMG.metalloid, desc: "Known historically for its toxicity. It serves complex roles in semiconductors." },
  { id: "34", name: "Selenium", symbol: "Se", atomic: 34, category: "Nonmetal", price: 45, image: IMG.nonmetal, desc: "A nonmetal with photoelectric properties. Critical for glassmaking and solar cells." },
  { id: "35", name: "Bromine", symbol: "Br", atomic: 35, category: "Nonmetal", price: 5, image: IMG.nonmetal, desc: "The only nonmetallic element that is liquid at room temperature. Deep red and pungent." },
  { id: "36", name: "Krypton", symbol: "Kr", atomic: 36, category: "Noble Gas", price: 250, image: IMG.noble, desc: "A rare noble gas used in precision lasers and high-efficiency lighting." },
  { id: "37", name: "Rubidium", symbol: "Rb", atomic: 37, category: "Alkali Metal", price: 12000, image: IMG.alkali, desc: "A soft, highly reactive alkali metal used in laser cooling and atomic clocks." },
  { id: "38", name: "Strontium", symbol: "Sr", atomic: 38, category: "Alkaline Earth Metal", price: 6, image: IMG.alkaline, desc: "A soft metal that burns crimson in fireworks and helps build magnetic materials." },
  { id: "39", name: "Yttrium", symbol: "Y", atomic: 39, category: "Transition Metal", price: 45, image: IMG.transition, desc: "A rare-earth transition metal used in phosphors and high-temperature superconductors." },
  { id: "40", name: "Zirconium", symbol: "Zr", atomic: 40, category: "Transition Metal", price: 150, image: IMG.transition, desc: "Highly resistant to corrosion and heat. Vital for nuclear reactor cladding." },
  { id: "41", name: "Niobium", symbol: "Nb", atomic: 41, category: "Transition Metal", price: 50, image: IMG.transition, desc: "Used to create superconducting magnets and high-strength low-alloy steels." },
  { id: "42", name: "Molybdenum", symbol: "Mo", atomic: 42, category: "Transition Metal", price: 40, image: IMG.transition, desc: "A refractory metal with an extremely high melting point. Essential for heavy industry." },
  { id: "43", name: "Technetium", symbol: "Tc", atomic: 43, category: "Transition Metal", price: 100000, image: IMG.transition, desc: "The first artificially produced element. Highly radioactive and used in medical imaging." },
  { id: "44", name: "Ruthenium", symbol: "Ru", atomic: 44, category: "Transition Metal", price: 14000, image: IMG.transition, desc: "A rare transition metal used to harden platinum and as a powerful catalyst." },
  { id: "45", name: "Rhodium", symbol: "Rh", atomic: 45, category: "Transition Metal", price: 150000, image: IMG.transition, desc: "One of the rarest and most valuable metals. Used in catalytic converters and jewelry." },
  { id: "46", name: "Palladium", symbol: "Pd", atomic: 46, category: "Transition Metal", price: 45000, image: IMG.transition, desc: "A noble metal with an incredible capacity to absorb hydrogen. Essential for modern cars." },
  { id: "47", name: "Silver", symbol: "Ag", atomic: 47, category: "Transition Metal", price: 900, image: IMG.alkali, desc: "The most reflective and conductive of all metals. Used in jewelry and photography." },
  { id: "48", name: "Cadmium", symbol: "Cd", atomic: 48, category: "Transition Metal", price: 1.5, image: IMG.transition, desc: "A soft, blue-white metal used in batteries and as a neutron absorber in reactors." },
  { id: "49", name: "Indium", symbol: "In", atomic: 49, category: "Metal", price: 400, image: IMG.metal, desc: "A soft, silvery metal. Used to create transparent conductive coatings for touchscreens." },
  { id: "50", name: "Tin", symbol: "Sn", atomic: 50, category: "Metal", price: 25, image: IMG.metal, desc: "A silvery metal that doesn't corrode easily. The key component of bronze and solder." },
  { id: "51", name: "Antimony", symbol: "Sb", atomic: 51, category: "Metalloid", price: 12, image: IMG.metalloid, desc: "A lustrous gray metalloid used in flame retardants and lead-acid batteries." },
  { id: "52", name: "Tellurium", symbol: "Te", atomic: 52, category: "Metalloid", price: 80, image: IMG.metalloid, desc: "A brittle, silver-white metalloid. Essential for cadmium telluride solar panels." },
  { id: "53", name: "Iodine", symbol: "I", atomic: 53, category: "Nonmetal", price: 50, image: IMG.nonmetal, desc: "A lustrous purple-black solid. Vital for human thyroid function and medicine." },
  { id: "54", name: "Xenon", symbol: "Xe", atomic: 54, category: "Noble Gas", price: 1200, image: IMG.noble, desc: "A heavy noble gas used in high-intensity lamps and ion propulsion for spacecraft." },
  { id: "55", name: "Caesium", symbol: "Cs", atomic: 55, category: "Alkali Metal", price: 11000, image: IMG.alkali, desc: "The most reactive metal. Used to define the second in atomic clocks." },
  { id: "56", name: "Barium", symbol: "Ba", atomic: 56, category: "Alkaline Earth Metal", price: 50, image: IMG.alkaline, desc: "A soft, silvery alkaline earth metal used in drilling fluids and X-ray imaging." },
  { id: "57", name: "Lanthanum", symbol: "La", atomic: 57, category: "Lanthanide", price: 5, image: IMG.lanthanide, desc: "The first lanthanide. Used in camera lenses and nickel-metal hydride batteries." },
  { id: "58", name: "Cerium", symbol: "Ce", atomic: 58, category: "Lanthanide", price: 3, image: IMG.lanthanide, desc: "The most abundant rare earth. Used in polishing glass and catalytic converters." },
  { id: "59", name: "Praseodymium", symbol: "Pr", atomic: 59, category: "Lanthanide", price: 100, image: IMG.lanthanide, desc: "Used in high-strength permanent magnets and specialized yellow glass." },
  { id: "60", name: "Neodymium", symbol: "Nd", atomic: 60, category: "Lanthanide", price: 120, image: IMG.lanthanide, desc: "The strongest known permanent magnet material. Found in headphones and EV motors." },
  { id: "61", name: "Promethium", symbol: "Pm", atomic: 61, category: "Lanthanide", price: 250000, image: IMG.lanthanide, desc: "A radioactive rare earth. Used in nuclear-powered batteries for spacecraft." },
  { id: "62", name: "Samarium", symbol: "Sm", atomic: 62, category: "Lanthanide", price: 3, image: IMG.lanthanide, desc: "Used in specialized magnets and as a neutron absorber in nuclear reactors." },
  { id: "63", name: "Europium", symbol: "Eu", atomic: 63, category: "Lanthanide", price: 300, image: IMG.lanthanide, desc: "The source of red phosphors in television and smartphone screens." },
  { id: "64", name: "Gadolinium", symbol: "Gd", atomic: 64, category: "Lanthanide", price: 40, image: IMG.lanthanide, desc: "Used as a contrast agent in MRI scans and in nuclear power regulation." },
  { id: "65", name: "Terbium", symbol: "Tb", atomic: 65, category: "Lanthanide", price: 1200, image: IMG.lanthanide, desc: "A silver-gray rare earth used in green phosphors and solid-state devices." },
  { id: "66", name: "Dysprosium", symbol: "Dy", atomic: 66, category: "Lanthanide", price: 450, image: IMG.lanthanide, desc: "Essential for high-performance magnets that must operate at high temperatures." },
  { id: "67", name: "Holmium", symbol: "Ho", atomic: 67, category: "Lanthanide", price: 400, image: IMG.lanthanide, desc: "Possesses the highest magnetic strength of any element. Used in medical lasers." },
  { id: "68", name: "Erbium", symbol: "Er", atomic: 68, category: "Lanthanide", price: 30, image: IMG.lanthanide, desc: "Used in optical fiber amplifiers and as a photographic filter." },
  { id: "69", name: "Thulium", symbol: "Tm", atomic: 69, category: "Lanthanide", price: 1500, image: IMG.lanthanide, desc: "A rare metal used in portable X-ray devices and specialized lasers." },
  { id: "70", name: "Ytterbium", symbol: "Yb", atomic: 70, category: "Lanthanide", price: 15, image: IMG.lanthanide, desc: "Used in atomic clocks and to improve the properties of stainless steel." },
  { id: "71", name: "Lutetium", symbol: "Lu", atomic: 71, category: "Lanthanide", price: 10000, image: IMG.lanthanide, desc: "The hardest and most expensive of the stable lanthanides. Used in cancer therapy." },
  { id: "72", name: "Hafnium", symbol: "Hf", atomic: 72, category: "Transition Metal", price: 1200, image: IMG.transition, desc: "A lustrous metal used in nuclear control rods and as a gate insulator in processors." },
  { id: "73", name: "Tantalum", symbol: "Ta", atomic: 73, category: "Transition Metal", price: 250, image: IMG.transition, desc: "Highly corrosion-resistant. Essential for capacitors in smartphones and laptops." },
  { id: "74", name: "Tungsten", symbol: "W", atomic: 74, category: "Transition Metal", price: 45, image: IMG.transition, desc: "The element with the highest melting point. Essential for light filaments and armor." },
  { id: "75", name: "Rhenium", symbol: "Re", atomic: 75, category: "Transition Metal", price: 2000, image: IMG.transition, desc: "A dense refractory metal. Essential for superalloys in jet engine turbines." },
  { id: "76", name: "Osmium", symbol: "Os", atomic: 76, category: "Transition Metal", price: 13000, image: IMG.transition, desc: "The densest naturally occurring element. Used in high-wear electrical contacts." },
  { id: "77", name: "Iridium", symbol: "Ir", atomic: 77, category: "Transition Metal", price: 160000, image: IMG.transition, desc: "The most corrosion-resistant material known. Rare and extremely valuable." },
  { id: "78", name: "Platinum", symbol: "Pt", atomic: 78, category: "Transition Metal", price: 32000, image: IMG.transition, desc: "A noble metal used in catalytic converters, jewelry, and chemotherapy." },
  { id: "79", name: "Gold", symbol: "Au", atomic: 79, category: "Transition Metal", price: 75000, image: IMG.gold, desc: "The eternal metal. Highly conductive, unreactive, and historically unrivaled." },
  { id: "80", name: "Mercury", symbol: "Hg", atomic: 80, category: "Metal", price: 50, image: IMG.mercury, desc: "The only metal that is liquid at standard conditions. Fascinating but toxic." },
  { id: "81", name: "Thallium", symbol: "Tl", atomic: 81, category: "Metal", price: 500, image: IMG.metal, desc: "A soft, gray metal used in infrared detectors and specialized medical imaging." },
  { id: "82", name: "Lead", symbol: "Pb", atomic: 82, category: "Metal", price: 2, image: IMG.metal, desc: "A dense, soft metal known for its ability to block radiation and its ancient uses." },
  { id: "83", name: "Bismuth", symbol: "Bi", atomic: 83, category: "Metal", price: 15, image: IMG.metalloid, desc: "A heavy metal with incredible colorful oxide crystals and low toxicity." },
  { id: "84", name: "Polonium", symbol: "Po", atomic: 84, category: "Metalloid", price: 1000000, image: IMG.actinide, desc: "A highly radioactive metalloid. Used as a heat source in lunar probes." },
  { id: "85", name: "Astatine", symbol: "At", atomic: 85, category: "Metalloid", price: 2000000, image: IMG.actinide, desc: "The rarest naturally occurring element. Highly radioactive and elusive." },
  { id: "86", name: "Radon", symbol: "Rn", atomic: 86, category: "Noble Gas", price: 500000, image: IMG.noble, desc: "A radioactive noble gas. It occurs naturally as a decay product of radium." },
  { id: "87", name: "Francium", symbol: "Fr", atomic: 87, category: "Alkali Metal", price: 1000000000, image: IMG.actinide, desc: "The most unstable of the first 101 elements. Only atoms exist at a time." },
  { id: "88", name: "Radium", symbol: "Ra", atomic: 88, category: "Alkaline Earth Metal", price: 100000, image: IMG.alkaline, desc: "Discovered by the Curies. A luminescent and highly radioactive alkaline earth metal." },
  { id: "89", name: "Actinium", symbol: "Ac", atomic: 89, category: "Actinide", price: 500000, image: IMG.actinide, desc: "A soft, silvery radioactive metal that glows blue in the dark." },
  { id: "90", name: "Thorium", symbol: "Th", atomic: 90, category: "Actinide", price: 150, image: IMG.actinide, desc: "A fertile material. Potential fuel for future clean-energy nuclear reactors." },
  { id: "91", name: "Protactinium", symbol: "Pa", atomic: 91, category: "Actinide", price: 250000, image: IMG.actinide, desc: "A dense, radioactive metal that is highly toxic and extremely rare." },
  { id: "92", name: "Uranium", symbol: "U", atomic: 92, category: "Actinide", price: 100, image: IMG.actinide, desc: "The primary fuel for nuclear energy. Dense, silvery, and naturally radioactive." },
  { id: "93", name: "Neptunium", symbol: "Np", atomic: 93, category: "Actinide", price: 600, image: IMG.actinide, desc: "The first transuranic element. Produced in nuclear reactors as a byproduct." },
  { id: "94", name: "Plutonium", symbol: "Pu", atomic: 94, category: "Actinide", price: 4000, image: IMG.actinide, desc: "A silvery-white actinide. A key component of nuclear power and weaponry." },
  { id: "95", name: "Americium", symbol: "Am", atomic: 95, category: "Actinide", price: 1500, image: IMG.actinide, desc: "Used in household smoke detectors and as a portable source of gamma rays." },
  { id: "96", name: "Curium", symbol: "Cm", atomic: 96, category: "Actinide", price: 2000000, image: IMG.actinide, desc: "A radioactive metal used to power instruments on Mars exploration rovers." },
  { id: "97", name: "Berkelium", symbol: "Bk", atomic: 97, category: "Actinide", price: 180000000, image: IMG.actinide, desc: "Produced in milligram quantities. Essential for the synthesis of heavier elements." },
  { id: "98", name: "Californium", symbol: "Cf", atomic: 98, category: "Actinide", price: 25000000, image: IMG.actinide, desc: "A powerful neutron emitter used in oil well logging and mineral prospecting." },
  { id: "99", name: "Einsteinium", symbol: "Es", atomic: 99, category: "Actinide", price: 500000000, image: IMG.actinide, desc: "Named after Albert Einstein. Produced via neutron bombardment of plutonium." },
  { id: "100", name: "Fermium", symbol: "Fm", atomic: 100, category: "Actinide", price: 1000000000, image: IMG.actinide, desc: "The heaviest element that can be produced by neutron bombardment." },
  { id: "101", name: "Mendelevium", symbol: "Md", atomic: 101, category: "Actinide", price: 1000000000, image: IMG.actinide, desc: "Named after the father of the periodic table, Dmitri Mendeleev." },
  { id: "102", name: "Nobelium", symbol: "No", atomic: 102, category: "Actinide", price: 1000000000, image: IMG.actinide, desc: "Produced in particle accelerators. Named after Alfred Nobel." },
  { id: "103", name: "Lawrencium", symbol: "Lr", atomic: 103, category: "Actinide", price: 1000000000, image: IMG.actinide, desc: "The final actinide. Synthetically produced and extremely short-lived." },
  { id: "104", name: "Rutherfordium", symbol: "Rf", atomic: 104, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "The first transactinide element. Only exists for seconds in a lab." },
  { id: "105", name: "Dubnium", symbol: "Db", atomic: 105, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "Named after Dubna, Russia. A highly unstable synthetic transition metal." },
  { id: "106", name: "Seaborgium", symbol: "Sg", atomic: 106, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "Named after Glenn Seaborg. Produced via heavy-ion bombardment." },
  { id: "107", name: "Bohrium", symbol: "Bh", atomic: 107, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "A synthetic element named after Niels Bohr. Only produced atom by atom." },
  { id: "108", name: "Hassium", symbol: "Hs", atomic: 108, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "A radioactive synthetic element. Believed to be a dense transition metal." },
  { id: "109", name: "Meitnerium", symbol: "Mt", atomic: 109, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "Named after Lise Meitner. A highly unstable element at the edge of the known." },
  { id: "110", name: "Darmstadtium", symbol: "Ds", atomic: 110, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "A heavy, synthetic element produced in a heavy-ion accelerator." },
  { id: "111", name: "Roentgenium", symbol: "Rg", atomic: 111, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "Named after Wilhelm Röntgen. A synthetic element of unknown properties." },
  { id: "112", name: "Copernicium", symbol: "Cn", atomic: 112, category: "Transition Metal", price: 1000000000, image: IMG.unknown, desc: "Named after Copernicus. An extremely volatile synthetic transition metal." },
  { id: "113", name: "Nihonium", symbol: "Nh", atomic: 113, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "The first element discovered in Asia. Short-lived and mysterious." },
  { id: "114", name: "Flerovium", symbol: "Fl", atomic: 114, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "A synthetic radioactive element. Part of the 'island of stability' theory." },
  { id: "115", name: "Moscovium", symbol: "Mc", atomic: 115, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "A heavy synthetic element. Only a few atoms have ever been detected." },
  { id: "116", name: "Livermorium", symbol: "Lv", atomic: 116, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "Named after the Lawrence Livermore National Laboratory. Extremely unstable." },
  { id: "117", name: "Tennessine", symbol: "Ts", atomic: 117, category: "Unknown", price: 1000000000, image: IMG.unknown, desc: "A halogen-like synthetic element at the frontier of atomic research." },
  { id: "118", name: "Oganesson", symbol: "Og", atomic: 118, category: "Noble Gas", price: 1000000000, image: IMG.unknown, desc: "The final known element. A synthetic noble gas that completes the 7th row." }
];

async function main() {
  console.log("Purging old inventory from Prisma...");
  await prisma.product.deleteMany({});
  
  console.log("Seeding all 118 atomic products into Prisma...");
  for (const el of elements) {
    try {
      await prisma.product.create({
        data: {
          id: `el-${el.atomic}`,
          name: el.name,
          symbol: el.symbol,
          atomicNumber: el.atomic,
          description: el.desc,
          price: el.price,
          imageUrl: el.image,
          stock: 100
        }
      });
      console.log(`[SYNTHESIZED] ${el.name} (Atomic ${el.atomic})`);
    } catch (e) {
      console.error(`FAILED: ${el.name}`, e);
    }
  }

  // Create an admin user automatically
  const bcrypt = require('bcryptjs');
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@e118.local' },
    update: {},
    create: {
      email: 'admin@e118.local',
      displayName: 'Admin User',
      password: hashedAdminPassword,
      isAdmin: true,
      credits: 1000000000,
    },
  });
  console.log("[ADMIN CREATED] admin@e118.local / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
