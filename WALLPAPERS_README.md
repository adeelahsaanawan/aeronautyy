# Mathematical Wallpapers by @aeronautyy

## Overview
A beautiful collection of high-resolution mathematical wallpapers featuring fractals, strange attractors, and geometric patterns. Each wallpaper is generated using Python and mathematical algorithms, showcasing the inherent beauty of mathematics.

## Features
- **6 Unique Wallpapers**: Mandelbrot Set, Julia Set, Lorenz Attractor, Barnsley Fern, Clifford Attractor, and Burning Ship
- **4K Resolution**: 3840×2160 pixels for crisp display quality
- **1000 DPI**: Print-ready quality for physical media
- **@aeronautyy Signature**: Each wallpaper includes the creator's signature
- **Mathematical Equations**: LaTeX-rendered formulas explaining each pattern
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Consistent with the main website theme

## Technical Implementation

### Wallpaper Generation
- **Language**: Python 3
- **Libraries**: NumPy, PIL (Pillow), ImageDraw, ImageFont
- **Generator Script**: `MathematicalWallpapers.py`
- **Sample Generator**: `generate_wallpapers.py`

### Web Implementation
- **Framework**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom components
- **Math Rendering**: KaTeX for LaTeX equations
- **Payment**: Stripe integration with buy button
- **Icons**: Font Awesome 6.4.0

### Payment System
- **Provider**: Stripe
- **Integration**: Stripe Buy Button with custom payment handler
- **Security**: Client-side payment verification with localStorage
- **Download Protection**: Payment-gated download system

## File Structure
```
├── mathematical-wallpapers.html    # Main wallpapers page
├── wallpapers/                     # Generated wallpaper images
│   ├── mandelbrot_set.png
│   ├── julia_set.png
│   ├── lorenz_attractor.png
│   ├── barnsley_fern.png
│   ├── clifford_attractor.png
│   └── burning_ship.png
├── js/
│   └── payment-handler.js          # Payment and download logic
├── MathematicalWallpapers.py       # Wallpaper generation script
└── generate_wallpapers.py          # Sample wallpaper generator
```

## Mathematical Concepts

### 1. Mandelbrot Set
- **Formula**: z_{n+1} = z_n² + c
- **Type**: Fractal
- **Description**: The most famous fractal, showing infinite complexity at the boundary

### 2. Julia Set
- **Formula**: f_c(z) = z² + c, where c = -0.7 + 0.27015i
- **Type**: Fractal
- **Description**: Beautiful fractal patterns with fixed parameters

### 3. Lorenz Attractor
- **Equations**: 
  - dx/dt = σ(y-x)
  - dy/dt = x(ρ-z)-y
  - dz/dt = xy-βz
- **Type**: Strange Attractor
- **Description**: Famous "butterfly effect" demonstrating chaos theory

### 4. Barnsley Fern
- **Method**: Iterated Function System (IFS)
- **Type**: Fractal
- **Description**: Nature-inspired fractal resembling a fern leaf

### 5. Clifford Attractor
- **Equations**:
  - x_{n+1} = sin(ay_n) + c·cos(ax_n)
  - y_{n+1} = sin(bx_n) + d·cos(by_n)
- **Type**: Strange Attractor
- **Description**: Creates mesmerizing spiral patterns

### 6. Burning Ship
- **Formula**: z_{n+1} = (|Re(z_n)| + i|Im(z_n)|)² + c
- **Type**: Fractal
- **Description**: Mandelbrot variation with dramatic, lava-like appearance

## Usage Instructions

### For Users
1. Visit the mathematical wallpapers page
2. Browse the collection and view mathematical equations
3. Click "Purchase Collection" to buy all wallpapers
4. After successful payment, download buttons become active
5. Click individual download buttons to get wallpapers

### For Developers
1. Generate new wallpapers: `python generate_wallpapers.py`
2. Modify wallpaper parameters in `MathematicalWallpapers.py`
3. Update the HTML gallery section to include new wallpapers
4. Test payment flow and download functionality

## Customization

### Adding New Wallpapers
1. Add new generator function to `MathematicalWallpapers.py`
2. Update `generate_wallpapers.py` to include the new wallpaper
3. Add new wallpaper card to the HTML gallery
4. Update the pricing and feature list

### Styling Modifications
- Colors: Modify CSS custom properties in `:root`
- Layout: Adjust Tailwind classes in HTML
- Animations: Update CSS transitions and transforms
- Dark mode: Modify `dark:` prefixed classes

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Lazy loading for wallpaper images
- Preloading of critical resources
- Optimized image formats and sizes
- Efficient CSS and JavaScript loading
- Responsive image delivery

## Security Features
- CSRF protection in contact forms
- Honeypot fields for spam prevention
- Secure payment processing via Stripe
- Client-side payment verification
- XSS protection through proper escaping

## Future Enhancements
- [ ] Server-side payment verification
- [ ] User accounts and download history
- [ ] Additional mathematical patterns
- [ ] Custom wallpaper generation
- [ ] Print-on-demand integration
- [ ] Mobile app version

## Contact
For questions, issues, or custom wallpaper requests, use the contact form on the wallpapers page or reach out through the main website.

---
Created with ❤️ and mathematics by @aeronautyy
