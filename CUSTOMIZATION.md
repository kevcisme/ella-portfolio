# Customization Guide

## 🎨 How to Customize Your Portfolio

### 1️⃣ Change Artist Name & Info

**File**: `src/components/portfolio/HeroSection.tsx`

```tsx
// Line ~195-203
<h1 className="...">
  Ella Tanibe  {/* ← Change your name here */}
</h1>

<p className="...">
  Botanical Artist & Illustrator  {/* ← Change your title */}
</p>

<p className="...">
  Where Victorian elegance meets... {/* ← Change your tagline */}
</p>
```

---

### 2️⃣ Update Gallery Artworks

**File**: `src/components/portfolio/GallerySection.tsx`

```tsx
// Lines ~7-59 - Replace the artworks array
const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Your Artwork Title',
    image: 'path/to/your/image.jpg',  // Replace with your image URLs
    size: 'large',  // Options: 'small', 'medium', 'large'
    category: 'Your Category',
  },
  // Add more artworks...
];
```

**Image Size Guidelines:**
- Small: ~400x400px
- Medium: ~800x400px  
- Large: ~800x800px

---

### 3️⃣ Customize About Section

**File**: `src/components/portfolio/AboutSection.tsx`

```tsx
// Line ~112 - Change portrait image
<img
  src="https://your-image-url.com/portrait.jpg"
  alt="Your Name"
  className="..."
/>

// Lines ~125-158 - Update biography
<p className="...">
  Your biography text here...
</p>

// Line ~162 - Update signature
<p className="font-script text-3xl text-gold">
  Your Name
</p>

// Line ~165 - Update location and year
<p className="...">
  Est. 2024 · Your Location
</p>
```

---

### 4️⃣ Change Contact Email

**File**: `src/components/portfolio/ContactSection.tsx`

```tsx
// Line ~234 - Update email link
<a href="mailto:your-email@example.com" className="...">
  your-email@example.com
</a>

// Line ~241 - Update copyright
<p className="...">
  © 2024 Your Name. All rights reserved.
</p>
```

---

### 5️⃣ Customize Color Palette

**File**: `tailwind.config.js`

```js
// Lines ~66-71
colors: {
  'forest-deep': '#1a3a2e',    // Main background
  'forest-shadow': '#0f1e17',  // Dark shadows
  'sage': '#4a6b5c',           // Secondary panels
  'cream': '#f4f1e8',          // Text color
  'gold': '#d4af37',           // Accent color
}
```

After changing colors, search and replace across all component files if needed.

---

### 6️⃣ Change Typography

**File**: `src/index.css` (Line 1)

Replace the Google Fonts URL with your preferred fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=YourDisplayFont&family=YourBodyFont&display=swap');
```

**File**: `tailwind.config.js` (Lines ~73-77)

```js
fontFamily: {
  'display': ['Your Display Font', 'serif'],
  'body': ['Your Body Font', 'serif'],
  'script': ['Your Script Font', 'cursive'],
}
```

---

### 7️⃣ Add/Remove Navigation Items

**File**: `src/components/portfolio/Navigation.tsx`

```tsx
// Lines ~17-22
const navItems = [
  { id: 'hero', label: 'Home', icon: Flower2 },
  { id: 'gallery', label: 'Gallery', icon: Leaf },
  { id: 'about', label: 'About', icon: Feather },
  { id: 'contact', label: 'Contact', icon: Flower2 },
  // Add new sections here
];
```

**Also update in**: 
- `src/components/portfolio/MobileNavigation.tsx` (same structure)
- `src/components/home.tsx` (Line ~14) - Add section IDs to array

---

### 8️⃣ Modify Animation Speed

**File**: `tailwind.config.js` (Lines ~88-111)

```js
animation: {
  'fadeIn': 'fadeIn 0.6s ease-out forwards',  // Change 0.6s
  'glow': 'glow 3s ease-in-out infinite',     // Change 3s
  'float': 'float 6s ease-in-out infinite',   // Change 6s
}
```

**Gallery cascade delay**:  
`src/components/portfolio/GallerySection.tsx` (Line ~134)
```tsx
animationDelay: `${index * 100}ms`,  // Change 100ms
```

---

### 9️⃣ Connect Form to Email Service

**File**: `src/components/portfolio/ContactSection.tsx`

Replace the simulated submission (Lines ~28-37) with a real service:

**Option A: EmailJS**
```tsx
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    setIsSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

**Option B: Formspree**
```tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setIsSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### 🔟 Add SEO Meta Tags

**File**: `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Add these -->
  <title>Your Name - Botanical Artist</title>
  <meta name="description" content="Your portfolio description" />
  <meta property="og:title" content="Your Name - Artist Portfolio" />
  <meta property="og:description" content="Your description" />
  <meta property="og:image" content="https://yoursite.com/preview.jpg" />
  <meta property="og:url" content="https://yoursite.com" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

---

## 🚀 Quick Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages
```bash
# Update vite.config.ts:
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})

npm run build
# Deploy the 'dist' folder
```

---

## 📱 Testing Checklist

- [ ] Test on mobile (320px - 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Check all navigation links work
- [ ] Verify gallery lightbox opens/closes
- [ ] Test form submission
- [ ] Check animation performance
- [ ] Verify all images load
- [ ] Test accessibility (keyboard navigation)
- [ ] Check browser compatibility (Chrome, Firefox, Safari)

---

## 🆘 Common Issues

**Gallery images not loading?**
- Check image URLs are valid
- Ensure CORS is enabled for external images
- Use https:// URLs, not http://

**Fonts not showing?**
- Verify Google Fonts URL in index.css
- Check font names match in tailwind.config.js
- Clear browser cache

**Animations not working?**
- Ensure Tailwind animate plugin is installed
- Check animation classes are in tailwind.config.js
- Verify no conflicting CSS

**Mobile navigation stuck open?**
- Check z-index values
- Verify backdrop onClick handler works
- Test on actual device, not just DevTools

---

## 💡 Enhancement Ideas

- Add image lazy loading for performance
- Implement artwork filtering by category
- Add testimonials section
- Create blog/news section
- Add social media links
- Implement dark/light mode toggle
- Add print/download options for artwork
- Create admin dashboard for content management
- Add analytics (Google Analytics, Plausible)
- Implement internationalization (i18n)

---

**Need Help?** Check the component files for inline comments and documentation.
