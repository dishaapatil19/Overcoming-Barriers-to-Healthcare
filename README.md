# Overcoming-Barriers-to-Healthcare
Walkthrough - "WhyNot?" Healthcare Awareness Website
The "WhyNot?" healthcare awareness website has been successfully built and verified. It is a highly interactive, responsive single-page application built on pure HTML5, CSS3, and Vanilla JavaScript. By applying principles of behavioral design and empathy, the site identifies psychological roadblocks and encourages users to seek medical help early.

What We Did?
We created three core source files in the project folder:

index.html
: Contains semantic sections, a responsive navigation layout, custom inline SVGs (including the Hero graphic), and component layouts.
styles.css
: Implements custom property design system colors (Soft Teal, Medical Blue, Soft Green, Off-white), premium card layouts, glassmorphic menus, timeline alignments, and custom animations.
app.js
: Drives user interactions, chatbot dialogue typing, quiz calculations, daily task rewards, local storage saves, and scrolling animation observers.



Features Implemented & Tested


All interactive elements outlined in the specifications are functional:

  1. Interactive Navigation & Courage Points
Logo and Menu: Modern branding layout with a burger menu toggle for mobile viewport widths.
Courage Points System: Displays total earned points in the navigation header. Values persist across page reloads using localStorage.

  2. Empathic Hero Section
A clean, modern header showing a custom SVG illustration of a character sitting in thought, surrounded by floating text bubbles depicting physical and psychological barriers.

  3. Problem Cards & Drawer
Grid of 6 common barriers (Fear, Stigma, Cost, Time, Doubt, Masculinity Norms).
Clicking any card expands a premium detail drawer block below it containing explanatory behavioral insights, quotes, and action-oriented tips.

  4. Diagnostic Quiz & Health Readiness Gauge
A 3-step dynamic questionnaire evaluating symptom delay, core worries, and support requirements.
Uses score formulas to estimate the primary barrier profile and a Health Readiness Score (from 15 to 95).
Animates the SVG circular gauge stroke and counts up the text score dynamically upon completion.
 
  5. Future Impact Simulator
Side-by-side comparison highlighting Path A (Ignore) vs. Path B (Take Action).
Dragging the timeline slider adjusts the path opacities dynamically to show contrast in control and health outcomes.
  
  6. Anonymous Health Companion
A simulated AI chatbot interface.
Users can click quick-reply chips ("I'm scared", "I don't have time", etc.) or type custom text.
Match logic selects appropriate comforting dialogue, and outputs it character-by-character with typewriter speed and bouncing dot loading indicators.
  
  7. Wall of Excuses
A grid of color-styled blocks representing excuses.
Clicking blocks triggers a shatter scale-down and fade-out animation.
Shattering all 6 excuses reveals a hidden motivational resolution statement: "The barrier wasn't healthcare. The barrier was hesitation." and awards +100 Courage Points.
  
  8. Daily Challenge Widget
Picks a challenge card based on the current day's calendar date to help the user perform a low-pressure step.
Clicking completion triggers a check badge animation and adds +50 Courage Points, locking out the button for the calendar day.
  
  9. Impact Statistics
Displays clinical indicators. Uses IntersectionObserver to trigger count-up transitions when the stats enter the screen.
Verification Results
The site was verified locally via web browser preview:

Responsiveness: Layout components stack cleanly on mobile viewports. Menu collapses into toggle drawer correctly.
Interactions: All button actions, transition animations (shatter, gauge stroke, fade drawer, chatbot typing), and data saves in localStorage work seamlessly.
