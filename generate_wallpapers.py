#!/usr/bin/env python3
"""
Generate sample mathematical wallpapers for the website
"""

import os
import sys
from MathematicalWallpapers import *

def create_wallpapers_directory():
    """Create wallpapers directory if it doesn't exist"""
    if not os.path.exists("wallpapers"):
        os.makedirs("wallpapers")
        print("Created wallpapers directory")

def generate_sample_wallpapers():
    """Generate all available mathematical wallpapers"""

    create_wallpapers_directory()

    wallpapers_to_generate = [
        # Original 6 wallpapers
        {
            'name': 'Mandelbrot Set',
            'function': generate_mandelbrot_set,
            'file': 'wallpapers/mandelbrot_set.png',
            'description': 'The iconic Mandelbrot set fractal'
        },
        {
            'name': 'Julia Set',
            'function': generate_julia_set,
            'file': 'wallpapers/julia_set.png',
            'description': 'Beautiful Julia set fractal'
        },
        {
            'name': 'Lorenz Attractor',
            'function': generate_lorenz_attractor,
            'file': 'wallpapers/lorenz_attractor.png',
            'description': 'The famous butterfly effect attractor'
        },
        {
            'name': 'Barnsley Fern',
            'function': generate_barnsley_fern,
            'file': 'wallpapers/barnsley_fern.png',
            'description': 'Nature-inspired fractal fern'
        },
        {
            'name': 'Clifford Attractor',
            'function': generate_clifford_attractor,
            'file': 'wallpapers/clifford_attractor.png',
            'description': 'Mesmerizing strange attractor'
        },
        {
            'name': 'Burning Ship',
            'function': generate_burning_ship,
            'file': 'wallpapers/burning_ship.png',
            'description': 'Dramatic fractal with lava-like appearance'
        },
        # Additional wallpapers
        {
            'name': 'Random Math Art',
            'function': generate_random_math_art,
            'file': 'wallpapers/random_math_art.png',
            'description': 'Random mathematical art using sine-cosine functions'
        },
        {
            'name': 'De Jong Attractor',
            'function': generate_dejong_attractor,
            'file': 'wallpapers/dejong_attractor.png',
            'description': 'De Jong attractor with beautiful gradient'
        },
        {
            'name': 'Spirograph',
            'function': generate_spirograph,
            'file': 'wallpapers/spirograph.png',
            'description': 'Beautiful spirograph pattern'
        },
        {
            'name': 'Henon Attractor',
            'function': generate_henon_attractor,
            'file': 'wallpapers/henon_attractor.png',
            'description': 'Hénon map attractor'
        },
        {
            'name': 'Ikeda Attractor',
            'function': generate_ikeda_attractor,
            'file': 'wallpapers/ikeda_attractor.png',
            'description': 'Ikeda map attractor'
        },
        {
            'name': 'Lissajous Curve',
            'function': generate_lissajous_curve,
            'file': 'wallpapers/lissajous_curve.png',
            'description': 'Lissajous curve with turquoise-magenta gradient'
        },
        {
            'name': 'Rossler Attractor',
            'function': generate_rossler_attractor,
            'file': 'wallpapers/rossler_attractor.png',
            'description': 'Stunning Rössler attractor with rainbow gradient'
        },
        {
            'name': 'Thomas Attractor',
            'function': generate_thomas_attractor,
            'file': 'wallpapers/thomas_attractor.png',
            'description': 'Beautiful Thomas attractor with electric blue gradient'
        },
        {
            'name': 'Aizawa Attractor',
            'function': generate_aizawa_attractor,
            'file': 'wallpapers/aizawa_attractor.png',
            'description': 'Mesmerizing Aizawa attractor with cosmic colors'
        },
        {
            'name': 'Dadras Attractor',
            'function': generate_dadras_attractor,
            'file': 'wallpapers/dadras_attractor.png',
            'description': 'Electric Dadras attractor with neon lightning effect'
        },
        {
            'name': 'Chen Attractor',
            'function': generate_chen_attractor,
            'file': 'wallpapers/chen_attractor.png',
            'description': 'Fiery Chen attractor with phoenix-like colors'
        },
        {
            'name': 'Halvorsen Attractor',
            'function': generate_halvorsen_attractor,
            'file': 'wallpapers/halvorsen_attractor.png',
            'description': 'Stunning Halvorsen attractor with aurora-like colors'
        },
        {
            'name': 'Newton Fractal',
            'function': generate_newton_fractal,
            'file': 'wallpapers/newton_fractal.png',
            'description': 'Beautiful Newton fractal with prismatic colors'
        },
        {
            'name': 'Tricorn Fractal',
            'function': generate_tricorn_fractal,
            'file': 'wallpapers/tricorn_fractal.png',
            'description': 'Crystalline Tricorn fractal with ice-like colors'
        },
        {
            'name': 'Pickover Attractor',
            'function': generate_pickover_attractor,
            'file': 'wallpapers/pickover_attractor.png',
            'description': 'Alien-like Pickover attractor with otherworldly colors'
        },
        {
            'name': 'Gingerbreadman Map',
            'function': generate_gingerbreadman_map,
            'file': 'wallpapers/gingerbreadman_map.png',
            'description': 'Whimsical Gingerbreadman map with warm cookie colors'
        },
        {
            'name': 'Tinkerbell Map',
            'function': generate_tinkerbell_map,
            'file': 'wallpapers/tinkerbell_map.png',
            'description': 'Magical Tinkerbell map with sparkling fairy dust colors'
        },
        {
            'name': 'Four Wing Attractor',
            'function': generate_four_wing_attractor,
            'file': 'wallpapers/four_wing_attractor.png',
            'description': 'Magnificent Four Wing attractor with butterfly-like colors'
        }
    ]
    
    print("🎨 Generating Mathematical Wallpapers for Website...")
    print("=" * 60)
    
    for i, wallpaper in enumerate(wallpapers_to_generate, 1):
        try:
            print(f"\n📊 Generating {i}/{len(wallpapers_to_generate)}: {wallpaper['name']}")
            print(f"Description: {wallpaper['description']}")
            
            # Generate with signature
            wallpaper['function'](
                output_file=wallpaper['file'],
                add_signature=True
            )
            
            print(f"✅ {wallpaper['name']} generated successfully!")
            
        except Exception as e:
            print(f"❌ Error generating {wallpaper['name']}: {e}")
    
    print("\n🎉 Wallpaper generation complete!")
    print("Check the 'wallpapers' directory for your mathematical art!")

if __name__ == "__main__":
    generate_sample_wallpapers()
