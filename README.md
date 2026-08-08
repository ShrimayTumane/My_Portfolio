# Shrimay Tumane - Portfolio

A modern, premium portfolio website built with cutting-edge technologies and smooth animations.

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **EmailJS** - Contact form functionality

## Features

- **Premium Design**: Glassmorphism, smooth gradients, and modern aesthetics
- **Interactive Animations**: Smooth scroll animations, hover effects, and transitions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Split Hero Section**: Animated job title rotation and code window visualization
- **Project Showcase**: Featured project with detailed stats and project grid
- **Contact Form**: Functional contact form with EmailJS integration
- **Mouse Spotlight Effect**: Interactive cursor-following gradient
- **Animated Timeline**: Experience section with smooth animations
- **Skills Dashboard**: Interactive skill cards with experience levels

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd shrimay-portfolio-glow
```

2. Install dependencies:
```sh
npm install
```

### Running the Project

Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

Create an optimized production build:
```sh
npm run build
```

Preview the production build:
```sh
npm run preview
```

## Project Structure

```
shrimay-portfolio-glow/
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── pages/
│   │   └── Index.tsx    # Main portfolio page
│   ├── hooks/
│   │   └── use-toast.ts # Custom hooks
│   └── main.tsx         # App entry point
├── public/              # Static assets
└── package.json
```

## Configuration

### EmailJS Setup

To enable the contact form, configure EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Update the EmailJS configuration in `src/pages/Index.tsx`:
   - Replace `YOUR_SERVICE_ID` with your service ID
   - Replace `YOUR_TEMPLATE_ID` with your template ID
   - Replace `YOUR_PUBLIC_KEY` with your public key

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Shrimay Tumane. All rights reserved.

---

Built with ❤️ using React, TypeScript, and Framer Motion
