

are# **AI Coding Agent – Product Requirements Document (PRD)**

## **Project: TravelSnap — Fun Holiday Destination Explorer + AI Photo Placement**

---

## **1. Project Summary**

Build a simple, polished web app that:

1. **Shows popular holiday destinations**
2. **Displays places, activities, shows, and quick facts**
3. **Lets users upload a picture**
4. **Uses AI to place the user into a famous landmark scene** (e.g., user at Eiffel Tower in a fun pose)

The app should be lightweight, creative, and demo-friendly for a 3-minute hackathon presentation.

---

## **2. Main Features**

### **2.1 Destination Explorer (Core)**

* Display 5–10 holiday destinations

* Each destination must show:

  * 3–5 places to visit
  * 2–4 shows/activities
  * Quick facts (2–3 lines)
  * A destination image

* UI should allow users to:

  * Click a destination
  * See a simple details page / modal
  * View the quick facts and recommended places

---

### **2.2 AI Photo Placement Feature (Core)**

Allow users to:

1. **Upload an image of themselves**
2. **Choose a landmark** (Eiffel Tower, Times Square, Santorini, etc.)
3. AI generates:

   * User placed inside the scene
   * Fun pose
   * Matching lighting + background

**Implementation constraints:**

* Prefer a single API call (image-to-image + background replacement)
* Accept JPG/PNG
* Output should be a single combined image

If possible, allow **2–3 pose variations** (funny, cinematic, casual).

---

### **2.3 Onboarding / How It Works**

Provide a simple explanation:

* What the app does
* How to upload a picture
* How to explore destinations

This must be available as a link or a small card on the Home Page.

---

## **3. Stretch Features (Optional)**

If time permits, the agent may include:

* Save/share the generated image
* Simple animations on cards
* Auto-generated mini description of the user’s “travel postcard”
* Fun “randomize my destination” button

Not required but nice for polish.

---

## **4. Technical Requirements**

### **Frontend**

* React OR Next.js (preferred)
* Clean, modern layout
* Responsive design
* Minimalistic color palette

### **Backend (Optional)**

If needed for the AI endpoint:

* Lightweight serverless function (Vercel / Cloudflare)
* Firebase or Supabase storage (optional)

### **AI Image Feature**

Use one of the following (agent chooses the easiest option):

* Stable Diffusion (image-to-image + background replacement)
* Replicate API
* HuggingFace inference
* Any image editing API with:

  * background removal
  * composition
  * inpainting

**Important:**
The final result must clearly place the user in the landmark.

---

## **5. Pages / UI Structure**

### **5.1 Home Page**

* App name: **TravelSnap**
* “Explore Destinations” button
* “Create Travel Photo” button
* Simple intro text
* Nice hero image or animation

### **5.2 Destinations Page**

* Grid of destination cards
* Each card: image, name, short tagline
* Clicking opens:

  * Places to visit
  * Shows/activities
  * Quick facts

### **5.3 AI Photo Page**

* File upload
* Dropdown to select landmark
* “Generate Travel Photo” button
* Loading indicator
* Output image displayed in a card

### **5.4 How It Works Page**

* 4–6 bullet points guiding the user
* Short and easy to read

---

## **6. Non-Functional Requirements**

* App must load fast (<3 sec)
* Must be mobile responsive
* No major UI bugs
* AI generation should complete in <20 seconds
* No login required (keep simple!)

---

## **7. Deliverables for the Hackathon**

### **7.1 Working Deployed Web App**

* Hosted on Vercel or Netlify
* Publicly accessible URL

### **7.2 GitHub Repository**

Must include:

* Source code
* README with:

  * description
  * setup
  * features
  * how to use
  * tech stack

### **7.3 2–3 Sentence Project Summary**

AI Coding Agent must generate this.

### **7.4 Demo Video Script (3 minutes)**

AI must write:

* intro
* problem
* features
* demo steps
* tech used
* challenges & learnings

---

## **8. Acceptance Criteria**

A complete version includes:

* [ ] Destination Explorer fully functional
* [ ] At least 5 destinations with places + shows
* [ ] User image upload working
* [ ] AI-generated “user-in-landmark” image working
* [ ] Clean UI and mobile responsive
* [ ] Deployed website
* [ ] README completed
* [ ] Demo script produced

---

## **9. Creativity Requirements (Important for Judging)**

To maximize creativity score:

* Destination cards should be colorful and fun
* AI results must look playful and entertaining
* Use small animations or micro-interactions
* Provide fun text like:

  * **“You’re now in Paris!”**
  * **“Here’s your travel postcard!”**

---

