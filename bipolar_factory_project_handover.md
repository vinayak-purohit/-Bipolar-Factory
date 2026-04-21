# Bipolar Factory Website Redesign – Complete Handoff & Research Log

This document serves as a complete record of the research, strategy, assets, and executable code details for the Bipolar Factory Website Redesign project, allowing you to seamlessly continue work across different accounts.

---

## 1. Research phase & Data Collection
Before building the new site, extensive research was conducted on Bipolar Factory to capture its exact copy, mission, and visual style.

### A. Original Website Text Extraction
The original website (`https://www.bipolarfactory.com/`) was crawled and the following copy and structure were mapped for recreation:
- **Hero:** "we are a collective of forward-thinking minds driven by a singular purpose: to harness the power of technology for the betterment of society."
- **Products:** "Explore the Frontier of Innovation with Our Signature Products"
- **Tech Partnership:** "Elevate Your Tech Game" (with subsections: Technical Consulting, Digital Transformation, Research, Custom App Dev).
- **Case Studies ("Spotlight on Success"):** 
  - Automated Vote Counting for the Bihar Election (Gajapathy Chakravarthy - iNET).
  - EPR waste management portal (Boopathy Dharmaraj - Zigma).
  - WoTA Indoor GPS (Elavarasu Arumugham).

### B. Captured Visuals & Assets (From Chat)
Various visuals were captured via browser automation or generated via our integrated AI image services:
1. **Full Website Recording (Screenshots/Walkthrough):**
   - The browser subagent navigated all links sequentially and recorded it in a WebP file to preserve the legacy site.
   - *File Path:* `C:\Users\vinay\.gemini\antigravity\brain\2c48d486-883b-4b40-a343-b2859aa89a79\bipolar_factory_site_capture_1776774168003.webp`
2. **Generated Product Mockups:**
   - **OLY Store Sync:** `...\oly_store_sync_1776773256659.png`
   - **Metawood VR:** `...\metawood_vr_1776773274735.png`
   - **Big Data/EPR Case Study:** `...\case_study_data_1776773302755.png`

---

## 2. Iterations & Strategic Decisions
The project underwent a few revisions to dial in the perfect look and feel:
1. **V1 (Hacker Vibe):** Scrappy vanilla JS/CSS focusing on their internal `#HackTheFactory` culture.
2. **V2 (Enterprise Tech):** Transition to Vite + React and Glassmorphism. Incorporated a combo of 3D Options B & C (Lens + Data Grid).
3. **V3 (True-to-Source):** At the final request, the structure was strictly rebuilt using the original website as a 1:1 reference map. We isolated the 3D interaction to **Option B only** (The Digital Camera Lens) to avoid distractions while maintaining the new premium aesthetic.

---

## 3. The Final Code Architecture

### Technology Stack
- **Framework:** Vite + React (TypeScript)
- **Styling:** Tailwind CSS v4 (configured via `src/index.css` directly natively using CSS variables).
- **Animations & 3D:**
  - `framer-motion` for reveal and hover effects.
  - `@react-three/fiber` and `@react-three/drei` for rendering the responsive WebGL 3D Camera Lens.

### Component Breakdown (`src/components/`)
- **`Hero.tsx`**: Contains the customized `react-three-fiber` `<Canvas />` rendering the **Option B Digital Camera Lens**. The lens actively tracks the user's mouse and distorts the background lighting. Incorporates the exact "forward-thinking minds" original text.
- **`Products.tsx`**: Maps directly to the "Explore the Frontier of Innovation" copy and features the generated assets in glassmorphism hovering cards.
- **`TechPartnership.tsx`**: Recreates the Consulting, Transformation, Research, and Custom Development pipeline from the old site verbatim.
- **`CaseStudies.tsx`**: Restored the "Spotlight on Success" motif containing integrated client quotes for Bihar, Zigma, and WoTA.
- **`Contact.tsx`**: Sleek footer capturing standard form submissions, routing to Coimbatore HQ, and stripped of generic Lucide brand-icons.

### Building & Running
If initializing on a new machine:
```bash
# Provide Vite setup
npm install
npm run dev

# To build for production (Tested & Working)
npm run build
```
