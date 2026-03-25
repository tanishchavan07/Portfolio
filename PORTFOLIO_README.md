# Tanish Santosh Chavan - Portfolio Website

A modern, fully responsive personal portfolio website built with **React.js** and **plain CSS** featuring glassmorphism effects, smooth animations, and a professional dark theme.

## 🎨 Features

### Design & UI
- ✨ **Dark Theme** with modern glassmorphism effects
- 🌈 **Smooth Gradients** and premium Apple-level UI
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎯 **Clean Typography** and strategic spacing

### Animations & Effects
- ⚡ **Typing Animation** in hero section with multiple roles
- 🎬 **Smooth Scrolling** with scroll-to-section navigation
- 🔄 **Scroll Reveal Animations** - Fade and slide effects
- 🖱️ **Hover Effects** on cards, buttons, and interactive elements
- ✨ **Button Glow & Ripple Effects** for interactivity
- 🌊 **Animated Navbar** that transforms on scroll
- 🎪 **Floating Gradient Orbs** in the background
- 📍 **Scroll-to-Top Button** with smooth animation

### Components
- **Navbar** - Fixed navigation with hamburger menu
- **Hero Section** - Animated greeting with typing effect
- **About Section** - Professional summary with stats
- **Skills Section** - Animated progress bars and tech tags
- **Projects Section** - Interactive project cards with hover effects
- **Contact Section** - Multi-channel contact methods
- **ScrollToTop** - Easy navigation back to the top

### Technical Features
- 🔧 **Dynamic Project Rendering** using arrays and map
- 📦 **Reusable Components** with modular structure
- 🎯 **Optimized Performance** with clean component architecture
- 🔗 **SEO Friendly** with proper semantic HTML
- ♿ **Accessible** with focus styles and semantic elements

## 📁 Project Structure

```
myportfolio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Fixed navigation with smooth scroll
│   │   ├── Hero.js            # Hero section with typing animation
│   │   ├── About.js           # About me section
│   │   ├── Skills.js          # Skills with progress bars
│   │   ├── Projects.js        # Featured projects showcase
│   │   ├── Contact.js         # Contact methods and footer
│   │   └── ScrollToTop.js     # Scroll-to-top button
│   ├── styles/
│   │   ├── Global.css         # Global styles and variables
│   │   ├── Navbar.css         # Navbar styling
│   │   ├── Hero.css           # Hero section styling
│   │   ├── About.css          # About section styling
│   │   ├── Skills.css         # Skills section styling
│   │   ├── Projects.css       # Projects section styling
│   │   ├── Contact.css        # Contact section styling
│   │   └── ScrollToTop.css    # ScrollToTop styling
│   ├── App.js                 # Main App component
│   ├── App.css                # App-level styles
│   ├── index.js               # React entry point
│   ├── index.css              # Global resets
│   └── setupTests.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd myportfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🎯 Customization

### Updating Personal Information

All personal information is integrated into the components. Here's how to customize them:

1. **Navigation Logo** - Edit in `Navbar.js`:
   ```javascript
   <span className="logo-text">TS</span>
   <span className="logo-subtitle">Tanish</span>
   ```

2. **Hero Section** - Edit in `Hero.js`:
   - Change roles: `const roles = [...]`
   - Update contact links with your email and phone

3. **About Section** - Edit in `About.js`:
   - Update professional summary
   - Modify education details
   - Change CGPA and other stats

4. **Skills Section** - Edit in `Skills.js`:
   - Add/remove skills
   - Adjust proficiency levels (0-100)
   - Update tools list

5. **Projects Section** - Edit in `Projects.js`:
   - Modify project data in the `projects` array
   - Update tech stacks
   - Add/remove features
   - Update live demo and GitHub links

6. **Contact Section** - Edit in `Contact.js`:
   - Update email address
   - Modify phone number
   - Change social media links
   - Update location

### Color Scheme Customization

Edit CSS variables in `styles/Global.css`:

```css
:root {
  --primary-color: #0f0f1e;
  --secondary-color: #1a1a2e;
  --accent-color: #00d4ff;
  --accent-dark: #0099cc;
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
  /* ... more variables ... */
}
```

### Font Customization

The portfolio uses system fonts for optimal performance. To use custom fonts:

1. Add Google Fonts or local font files to `public/`
2. Import in `index.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Font-Name:wght@400;600;700&display=swap');
   ```
3. Update in `Global.css`:
   ```css
   font-family: 'Font-Name', sans-serif;
   ```

## 📱 Responsive Breakpoints

The portfolio is optimized for:
- **Desktop** - 1200px and above
- **Tablet** - 768px to 1199px
- **Mobile** - Below 768px
- **Small Mobile** - Below 480px

All components include responsive media queries for seamless experience across devices.

## ⚡ Performance Optimization

- Minimal CSS (no utility framework)
- Optimized animations using CSS transforms
- Lazy loading ready
- Modular component structure
- Clean JavaScript with no external animation libraries

## 🔗 Deployment

### Deploy to Vercel

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Deploy"

### Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Drag and drop the `build` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository

3. **Set build command:** `npm run build`
4. **Set publish directory:** `build`

### Deploy to GitHub Pages

1. **Add to `package.json`:**
   ```json
   "homepage": "https://yourusername.github.io/myportfolio"
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to `package.json`:**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## 📚 Technologies Used

- **React.js** - UI library
- **CSS3** - Styling with animations and gradients
- **JavaScript (ES6+)** - Interactivity
- **Node.js** - Development environment

## 🎨 Design Inspirations

The design combines:
- Apple-level UI/UX principles
- Modern glassmorphism effects
- Smooth micro-animations
- Professional color palettes
- Accessible design patterns

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork, modify, and use this template for your own portfolio!

## 📞 Contact

- **Email:** tanishchavan06@gmail.com
- **Phone:** +91 9137770667
- **GitHub:** [github.com/tanishchavan07](https://github.com/tanishchavan07)
- **LinkedIn:** [linkedin.com/in/tanish-chavan](https://linkedin.com/in/tanish-chavan)
- **Portfolio:** [Your deployed URL]

---

Built with ❤️ using React.js and CSS3

**Last Updated:** March 2026
