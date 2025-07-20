#!/usr/bin/env python3
"""
Complete Mathematical Wallpaper Generator
A comprehensive collection of mathematical wallpaper generators including:
- All original wallpaper types from the old script
- 20 new amazing mathematical patterns
- Beautiful color gradients optimized for dark backgrounds
- High-resolution output with FOCUS text overlay

Author: Enhanced Collection
Version: Complete Edition
"""

import numpy as np
from PIL import Image, ImageDraw, ImageFont
import random
import math
import os

def add_signature_to_image(draw, image_size, signature="@aeronautyy", font_size=None,
                           fill=(255, 255, 255), outline_color=(0, 0, 0), outline_width=1):
    """
    Adds signature text to the bottom right corner of the image.
    """
    width, height = image_size
    if font_size is None:
        font_size = int(height / 100)  # Much smaller, more subtle signature

    font_path = r"D:\Cool Automation Scripts\My Wallpapers\Monoton-Regular.ttf"
    try:
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        try:
            # Try system fonts
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), signature, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Position in bottom right corner with margin
    margin = 30
    x = width - text_width - margin
    y = height - text_height - margin

    # Draw outline
    for dx in range(-outline_width, outline_width + 1):
        for dy in range(-outline_width, outline_width + 1):
            if dx != 0 or dy != 0:
                draw.text((x + dx, y + dy), signature, font=font, fill=outline_color)

    # Draw main signature
    draw.text((x, y), signature, font=font, fill=fill)

def random_function(x: float, y: float) -> float:
    """Compute a color factor based on a sine-cosine combination."""
    return np.sin(x * y) + np.cos(x - y)

def random_function2(x: float, y: float) -> float:
    """Compute a second color factor using sine and cosine of scaled inputs."""
    return np.sin(np.pi * x) * np.cos(np.pi * y)

# ============================================================================
# ORIGINAL WALLPAPER GENERATORS (From your old script)
# ============================================================================

def generate_random_math_art(image_size=(3840, 2160), num_points=300000,
                            output_file="wallpapers/random_math_art.png",
                            dpi=(1000, 1000), brightness_factor=1.5, add_signature=False):
    """Generates random mathematical art using sine-cosine functions."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    for _ in range(num_points):
        x = random.uniform(-1, 1)
        y = random.uniform(-1, 1)
        
        px = int((x + 1) / 2 * width)
        py = int((y + 1) / 2 * height)
        
        r_raw = abs(random_function(x, y))
        g_raw = abs(random_function2(x, y))
        
        r = int(np.clip(r_raw / 2 * 255 * brightness_factor, 0, 255))
        g = int(np.clip(g_raw / 2 * 255 * brightness_factor, 0, 255))
        b = int(np.clip((r + g) / 2, 0, 255))
        
        draw.point((px, py), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)

    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Random Math Art saved as {output_file}")

def generate_dejong_attractor(image_size=(3840, 2160), num_points=300000,
                             output_file="D:/Cool Automation Scripts/My Wallpapers/dejong_attractor.png",
                             dpi=(1000, 1000), add_signature=False):
    """Generates de Jong attractor with beautiful gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    a, b, c, d = 2.01, -2.53, 1.61, -0.33
    x, y = 0.0, 0.0
    
    for _ in range(100):
        x, y = np.sin(a * y) - np.cos(b * x), np.sin(c * x) - np.cos(d * y)
    
    points = []
    for _ in range(num_points):
        x, y = np.sin(a * y) - np.cos(b * x), np.sin(c * x) - np.cos(d * y)
        points.append((x, y))
    
    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6
    
    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points
        
        r = int(128 + 127 * ratio)
        g = int(0 + 255 * ratio)
        b = int(128 + 127 * ratio)
        
        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)

    img.save(output_file, dpi=dpi)
    img.show()
    print(f"de Jong Attractor saved as {output_file}")

def generate_spirograph(image_size=(3840, 2160), num_points=10000,
                       output_file="D:/Cool Automation Scripts/My Wallpapers/spirograph.png",
                       dpi=(1000, 1000), add_signature=False):
    """Generates beautiful spirograph pattern."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    R, r, L = 200, 80, 90
    T = 20 * np.pi
    t_values = np.linspace(0, T, num_points)
    
    points = []
    for t in t_values:
        x = (R - r) * np.cos(t) + L * np.cos(((R - r) / r) * t)
        y = (R - r) * np.sin(t) - L * np.sin(((R - r) / r) * t)
        points.append((x, y))
    
    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6
    
    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points
        
        r = int(128 + 127 * ratio)
        g = int(0 + 255 * ratio)
        b = int(128 + 127 * ratio)
        
        draw.point((x_coord, y_coord), fill=(r, g, b))
    
    if add_signature:
        add_signature_to_image(draw, image_size)

    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Spirograph saved as {output_file}")

def generate_clifford_attractor(image_size=(3840, 2160), num_points=300000,
                               output_file="D:/Cool Automation Scripts/My Wallpapers/clifford_attractor.png",
                               dpi=(1000, 1000), add_signature=False):
    """Generates Clifford attractor with magenta-cyan gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    a, b, c, d = -1.4, 1.6, 1.0, 0.7
    x, y = 0.0, 0.0
    
    for _ in range(100):
        x, y = np.sin(a * y) + c * np.cos(a * x), np.sin(b * x) + d * np.cos(b * y)
    
    points = []
    for _ in range(num_points):
        x, y = np.sin(a * y) + c * np.cos(a * x), np.sin(b * x) + d * np.cos(b * y)
        points.append((x, y))
    
    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6
    
    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points
        
        r = int(255 * ratio)
        g = int(255 - 255 * ratio)
        b = int(255)
        
        draw.point((x_coord, y_coord), fill=(r, g, b))
    
    if add_signature:
        add_signature_to_image(draw, image_size)

    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Clifford Attractor saved as {output_file}")

def generate_henon_attractor(image_size=(3840, 2160), num_points=300000,
                            output_file="D:/Cool Automation Scripts/My Wallpapers/henon_attractor.png",
                            dpi=(1000, 1000), add_signature=False):
    """Generates Hénon map attractor."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    a, b = 1.4, 0.3
    x, y = 0.0, 0.0
    
    for _ in range(100):
        x, y = 1 - a * x * x + y, b * x
    
    points = []
    for _ in range(num_points):
        x, y = 1 - a * x * x + y, b * x
        points.append((x, y))
    
    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6
    
    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points
        
        r = int(0 + 128 * ratio)
        g = int(0 + 191 * ratio)
        b = int(128 + 127 * ratio)
        
        draw.point((x_coord, y_coord), fill=(r, g, b))
    
    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Hénon Attractor saved as {output_file}")

def generate_ikeda_attractor(image_size=(3840, 2160), num_points=300000,
                            output_file="D:/Cool Automation Scripts/My Wallpapers/ikeda_attractor.png",
                            dpi=(1000, 1000), add_signature=False):
    """Generates Ikeda map attractor."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    u = 0.9
    x, y = 0.0, 0.0
    
    for _ in range(100):
        t = 0.4 - 6 / (1 + x*x + y*y)
        new_x = 1 + u * (x * math.cos(t) - y * math.sin(t))
        new_y = u * (x * math.sin(t) + y * math.cos(t))
        x, y = new_x, new_y
    
    points = []
    for _ in range(num_points):
        t = 0.4 - 6 / (1 + x*x + y*y)
        new_x = 1 + u * (x * math.cos(t) - y * math.sin(t))
        new_y = u * (x * math.sin(t) + y * math.cos(t))
        x, y = new_x, new_y
        points.append((x, y))
    
    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6
    
    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points
        
        r = int(0 + 139 * ratio)
        g = int(0 + 255 * ratio)
        b = int(139 + 116 * ratio)
        
        draw.point((x_coord, y_coord), fill=(r, g, b))
    
    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Ikeda Attractor saved as {output_file}")

def generate_lorenz_attractor(image_size=(3840, 2160), num_points=200000,
                             output_file="D:/Cool Automation Scripts/My Wallpapers/lorenz_attractor.png",
                             dpi=(1000, 1000), add_signature=False):
    """Generates Lorenz attractor with red-yellow gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)
    
    sigma, beta, rho, dt = 10.0, 8.0/3.0, 28.0, 0.01
    x, y, z = 1.0, 1.0, 1.0
    
    for _ in range(1000):
        dx = sigma * (y - x)
        dy = x * (rho - z) - y
        dz = x * y - beta * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
    
    points = []
    for _ in range(num_points):
        dx = sigma * (y - x)
        dy = x * (rho - z) - y
        dz = x * y - beta * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, z))
    
    xs, zs = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_z, max_z = min(zs), max(zs)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_z = max_z - min_z if max_z != min_z else 1e-6
    
    for i, (px, pz) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        z_coord = int((pz - min_z) / range_z * (height - 1))
        ratio = i / num_points
        
        r = int(139 + 116 * ratio)
        g = int(0 + 255 * ratio)
        b = int(0)
        
        draw.point((x_coord, z_coord), fill=(r, g, b))
    
    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Lorenz Attractor saved as {output_file}")

def generate_julia_set(image_size=(3840, 2160), max_iter=100,
                      output_file="D:/Cool Automation Scripts/My Wallpapers/julia_set.png",
                      dpi=(1000, 1000), add_signature=False):
    """Generates Julia set fractal with blue-pink gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    c = complex(-0.7, 0.27015)
    x_min, x_max = -2.0, 2.0
    y_min, y_max = -2.0, 2.0

    for py in range(0, height, 2):
        for px in range(0, width, 2):
            x = x_min + (px / width) * (x_max - x_min)
            y = y_min + (py / height) * (y_max - y_min)
            z = complex(x, y)

            n = 0
            while abs(z) <= 2 and n < max_iter:
                z = z*z + c
                n += 1

            if n == max_iter:
                color = (0, 0, 0)
            else:
                ratio = n / max_iter
                r = int(0 + 139 * ratio)
                g = int(0 + 255 * ratio)
                b = int(139 + 116 * ratio)
                color = (r, g, b)

            for dy in range(2):
                for dx in range(2):
                    if px + dx < width and py + dy < height:
                        draw.point((px + dx, py + dy), fill=color)

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Julia Set saved as {output_file}")

def generate_mandelbrot_set(image_size=(3840, 2160), max_iter=80,
                           output_file="D:/Cool Automation Scripts/My Wallpapers/mandelbrot_set.png",
                           dpi=(1000, 1000), add_signature=False):
    """Generates Mandelbrot set fractal with deep blue gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    x_min, x_max = -2.5, 1.0
    y_min, y_max = -1.25, 1.25

    for py in range(0, height, 2):
        for px in range(0, width, 2):
            x = x_min + (px / width) * (x_max - x_min)
            y = y_min + (py / height) * (y_max - y_min)
            c = complex(x, y)
            z = 0

            n = 0
            while abs(z) <= 2 and n < max_iter:
                z = z*z + c
                n += 1

            if n == max_iter:
                color = (0, 0, 0)
            else:
                ratio = n / max_iter
                r = int(0 + 128 * ratio)
                g = int(0 + 191 * ratio)
                b = int(128 + 127 * ratio)
                color = (r, g, b)

            for dy in range(2):
                for dx in range(2):
                    if px + dx < width and py + dy < height:
                        draw.point((px + dx, py + dy), fill=color)

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Mandelbrot Set saved as {output_file}")

def generate_barnsley_fern(image_size=(3840, 2160), num_points=300000,
                          output_file="D:/Cool Automation Scripts/My Wallpapers/barnsley_fern.png",
                          dpi=(1000, 1000), add_signature=False):
    """Generates Barnsley fern fractal with green gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    x, y = 0.0, 0.0
    points = []

    for i in range(num_points):
        r = random.random()
        if r < 0.01:
            x, y = 0, 0.16 * y
        elif r < 0.86:
            x, y = 0.85 * x + 0.04 * y, -0.04 * x + 0.85 * y + 1.6
        elif r < 0.93:
            x, y = 0.2 * x - 0.26 * y, 0.23 * x + 0.22 * y + 1.6
        else:
            x, y = -0.15 * x + 0.28 * y, 0.26 * x + 0.24 * y + 0.44

        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(0 + 50 * ratio)
        g = int(50 + 188 * ratio)
        b = int(0 + 144 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Barnsley Fern saved as {output_file}")

def generate_lissajous_curve(image_size=(3840, 2160), num_points=50000,
                            output_file="D:/Cool Automation Scripts/My Wallpapers/lissajous_curve.png",
                            dpi=(1000, 1000), add_signature=False):
    """Generates Lissajous curve with turquoise-magenta gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b = 3, 2
    delta = np.pi / 2
    t_values = np.linspace(0, 2 * np.pi, num_points)

    points = []
    for t in t_values:
        x = np.sin(a * t + delta)
        y = np.sin(b * t)
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(64 + 191 * ratio)
        g = int(224 + 31 * ratio)
        b = int(208 + 47 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Lissajous Curve saved as {output_file}")

# ============================================================================
# 20 NEW AMAZING MATHEMATICAL WALLPAPER GENERATORS
# ============================================================================

def generate_rossler_attractor(image_size=(3840, 2160), num_points=300000,
                              output_file="D:/Cool Automation Scripts/My Wallpapers/rossler_attractor.png",
                              dpi=(1000, 1000), add_signature=False):
    """Generates stunning Rössler attractor with rainbow gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c = 0.2, 0.2, 5.7
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.01

    for _ in range(1000):
        dx = -y - z
        dy = x + a * y
        dz = b + z * (x - c)
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = -y - z
        dy = x + a * y
        dz = b + z * (x - c)
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))

        hue = (i / num_points) * 360
        if hue < 60:
            r, g, b = 255, int(255 * hue / 60), 0
        elif hue < 120:
            r, g, b = int(255 * (120 - hue) / 60), 255, 0
        elif hue < 180:
            r, g, b = 0, 255, int(255 * (hue - 120) / 60)
        elif hue < 240:
            r, g, b = 0, int(255 * (240 - hue) / 60), 255
        elif hue < 300:
            r, g, b = int(255 * (hue - 240) / 60), 0, 255
        else:
            r, g, b = 255, 0, int(255 * (360 - hue) / 60)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Rössler Attractor saved as {output_file}")

def generate_thomas_attractor(image_size=(3840, 2160), num_points=300000,
                             output_file="D:/Cool Automation Scripts/My Wallpapers/thomas_attractor.png",
                             dpi=(1000, 1000)):
    """Generates beautiful Thomas attractor with electric blue gradient."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    b = 0.208186
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.1

    for _ in range(1000):
        dx = np.sin(y) - b * x
        dy = np.sin(z) - b * y
        dz = np.sin(x) - b * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = np.sin(y) - b * x
        dy = np.sin(z) - b * y
        dz = np.sin(x) - b * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, z))

    xs, zs = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_z, max_z = min(zs), max(zs)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_z = max_z - min_z if max_z != min_z else 1e-6

    for i, (px, pz) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        z_coord = int((pz - min_z) / range_z * (height - 1))
        ratio = i / num_points

        r = int(0 + 100 * ratio)
        g = int(100 + 155 * ratio)
        b = int(255)

        draw.point((x_coord, z_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Thomas Attractor saved as {output_file}")

def generate_aizawa_attractor(image_size=(3840, 2160), num_points=300000,
                             output_file="D:/Cool Automation Scripts/My Wallpapers/aizawa_attractor.png",
                             dpi=(1000, 1000), add_signature=False):
    """Generates mesmerizing Aizawa attractor with cosmic colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c, d, e, f = 0.95, 0.7, 0.6, 3.5, 0.25, 0.1
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.01

    for _ in range(1000):
        dx = (z - b) * x - d * y
        dy = d * x + (z - b) * y
        dz = c + a * z - (z**3)/3 - (x**2 + y**2) * (1 + e * z) + f * z * (x**3)
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = (z - b) * x - d * y
        dy = d * x + (z - b) * y
        dz = c + a * z - (z**3)/3 - (x**2 + y**2) * (1 + e * z) + f * z * (x**3)
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(75 + 180 * ratio)
        g = int(0 + 215 * ratio)
        b = int(130 - 130 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Aizawa Attractor saved as {output_file}")

def generate_dadras_attractor(image_size=(3840, 2160), num_points=300000,
                             output_file="D:/Cool Automation Scripts/My Wallpapers/dadras_attractor.png",
                             dpi=(1000, 1000), add_signature=False):
    """Generates electric Dadras attractor with neon lightning effect."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c, d, e = 3, 2.7, 1.7, 2, 9
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.005

    for _ in range(1000):
        dx = y - a * x + b * y * z
        dy = c * y - x * z + z
        dz = d * x * y - e * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = y - a * x + b * y * z
        dy = c * y - x * z + z
        dz = d * x * y - e * z
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, z))

    xs, zs = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_z, max_z = min(zs), max(zs)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_z = max_z - min_z if max_z != min_z else 1e-6

    for i, (px, pz) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        z_coord = int((pz - min_z) / range_z * (height - 1))
        ratio = i / num_points

        # Electric green to cyan gradient
        r = int(0 + 64 * ratio)     # Dark to teal
        g = int(255 - 31 * ratio)   # Bright green to cyan
        b = int(127 + 128 * ratio)  # Green to bright cyan

        draw.point((x_coord, z_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Dadras Attractor saved as {output_file}")

def generate_chen_attractor(image_size=(3840, 2160), num_points=300000,
                           output_file="D:/Cool Automation Scripts/My Wallpapers/chen_attractor.png",
                           dpi=(1000, 1000), add_signature=False):
    """Generates fiery Chen attractor with phoenix-like colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c = 5, -10, -0.38
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.003

    for _ in range(1000):
        dx = a * x - y * z
        dy = b * y + x * z
        dz = c * z + x * y / 3
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = a * x - y * z
        dy = b * y + x * z
        dz = c * z + x * y / 3
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(255)
        g = int(0 + 255 * ratio)
        b = int(0 + 50 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Chen Attractor saved as {output_file}")

def generate_halvorsen_attractor(image_size=(3840, 2160), num_points=300000,
                                output_file="D:/Cool Automation Scripts/My Wallpapers/halvorsen_attractor.png",
                                dpi=(1000, 1000), add_signature=False):
    """Generates stunning Halvorsen attractor with aurora-like colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a = 1.89
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.005

    for _ in range(1000):
        dx = -a * x - 4 * y - 4 * z - y**2
        dy = -a * y - 4 * z - 4 * x - z**2
        dz = -a * z - 4 * x - 4 * y - x**2
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt

    points = []
    for _ in range(num_points):
        dx = -a * x - 4 * y - 4 * z - y**2
        dy = -a * y - 4 * z - 4 * x - z**2
        dz = -a * z - 4 * x - 4 * y - x**2
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(0 + 100 * ratio)
        g = int(255 - 100 * ratio)
        b = int(100 + 155 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Halvorsen Attractor saved as {output_file}")

def generate_newton_fractal(image_size=(3840, 2160), max_iter=50,
                           output_file="D:/Cool Automation Scripts/My Wallpapers/newton_fractal.png",
                           dpi=(1000, 1000), add_signature=False):
    """Generates beautiful Newton fractal with prismatic colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    roots = [complex(1, 0), complex(-0.5, 0.866), complex(-0.5, -0.866)]
    colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255)]

    for py in range(0, height, 2):
        for px in range(0, width, 2):
            x = (px - width/2) / (width/4)
            y = (py - height/2) / (height/4)
            z = complex(x, y)

            for i in range(max_iter):
                if abs(z) < 1e-10:
                    break
                z = z - (z**3 - 1) / (3 * z**2)

            distances = [abs(z - root) for root in roots]
            closest_root = distances.index(min(distances))

            base_color = colors[closest_root]
            intensity = min(1.0, i / max_iter)
            color = tuple(int(c * intensity) for c in base_color)

            for dy in range(2):
                for dx in range(2):
                    if px + dx < width and py + dy < height:
                        draw.point((px + dx, py + dy), fill=color)

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Newton Fractal saved as {output_file}")

def generate_burning_ship(image_size=(3840, 2160), max_iter=100,
                         output_file="D:/Cool Automation Scripts/My Wallpapers/burning_ship.png",
                         dpi=(1000, 1000), add_signature=False):
    """Generates dramatic Burning Ship fractal with lava colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    x_min, x_max = -2.5, 1.5
    y_min, y_max = -2.0, 1.0

    for py in range(0, height, 2):
        for px in range(0, width, 2):
            x = x_min + (px / width) * (x_max - x_min)
            y = y_min + (py / height) * (y_max - y_min)
            c = complex(x, y)
            z = 0

            n = 0
            while abs(z) <= 2 and n < max_iter:
                z = complex(abs(z.real), abs(z.imag))**2 + c
                n += 1

            if n == max_iter:
                color = (0, 0, 0)
            else:
                ratio = n / max_iter
                r = int(255 * min(1, ratio * 2))
                g = int(255 * max(0, ratio - 0.5) * 2)
                b = int(50 * ratio)
                color = (r, g, b)

            for dy in range(2):
                for dx in range(2):
                    if px + dx < width and py + dy < height:
                        draw.point((px + dx, py + dy), fill=color)

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Burning Ship Fractal saved as {output_file}")

def generate_tricorn_fractal(image_size=(3840, 2160), max_iter=100,
                            output_file="D:/Cool Automation Scripts/My Wallpapers/tricorn_fractal.png",
                            dpi=(1000, 1000), add_signature=False):
    """Generates crystalline Tricorn fractal with ice-like colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    x_min, x_max = -2.5, 1.0
    y_min, y_max = -1.5, 1.5

    for py in range(0, height, 2):
        for px in range(0, width, 2):
            x = x_min + (px / width) * (x_max - x_min)
            y = y_min + (py / height) * (y_max - y_min)
            c = complex(x, y)
            z = 0

            n = 0
            while abs(z) <= 2 and n < max_iter:
                z = z.conjugate()**2 + c
                n += 1

            if n == max_iter:
                color = (0, 0, 0)
            else:
                ratio = n / max_iter
                r = int(100 + 155 * ratio)
                g = int(150 + 105 * ratio)
                b = int(255)
                color = (r, g, b)

            for dy in range(2):
                for dx in range(2):
                    if px + dx < width and py + dy < height:
                        draw.point((px + dx, py + dy), fill=color)

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Tricorn Fractal saved as {output_file}")

def generate_pickover_attractor(image_size=(3840, 2160), num_points=300000,
                               output_file="D:/Cool Automation Scripts/My Wallpapers/pickover_attractor.png",
                               dpi=(1000, 1000), add_signature=False):
    """Generates alien-like Pickover attractor with otherworldly colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c, d = 2.24, 0.43, -0.65, -2.43
    x, y = 0.0, 0.0

    points = []
    for _ in range(num_points):
        new_x = np.sin(a * y) + c * np.cos(a * x)
        new_y = np.sin(b * x) + d * np.cos(b * y)
        x, y = new_x, new_y
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(100 + 155 * ratio)
        g = int(255 - 155 * ratio)
        b = int(100 + 155 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Pickover Attractor saved as {output_file}")

def generate_gingerbreadman_map(image_size=(3840, 2160), num_points=300000,
                               output_file="D:/Cool Automation Scripts/My Wallpapers/gingerbreadman_map.png",
                               dpi=(1000, 1000), add_signature=False):
    """Generates whimsical Gingerbreadman map with warm cookie colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    x, y = 0.0, 0.0
    points = []

    for _ in range(num_points):
        new_x = 1 - y + abs(x)
        new_y = x
        x, y = new_x, new_y
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(139 + 116 * ratio)
        g = int(69 + 146 * ratio)
        b = int(19 + 81 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Gingerbreadman Map saved as {output_file}")

def generate_tinkerbell_map(image_size=(3840, 2160), num_points=300000,
                           output_file="D:/Cool Automation Scripts/My Wallpapers/tinkerbell_map.png",
                           dpi=(1000, 1000), add_signature=False):
    """Generates magical Tinkerbell map with sparkling fairy dust colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c, d = 0.9, -0.6013, 2.0, 0.50
    x, y = 0.0, 0.0

    points = []
    for _ in range(num_points):
        new_x = x**2 - y**2 + a * x + b * y
        new_y = 2 * x * y + c * x + d * y
        x, y = new_x, new_y
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(255)
        g = int(105 + 150 * ratio)
        b = int(180 - 180 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Tinkerbell Map saved as {output_file}")

def generate_four_wing_attractor(image_size=(3840, 2160), num_points=300000,
                                output_file="D:/Cool Automation Scripts/My Wallpapers/four_wing_attractor.png",
                                dpi=(1000, 1000), add_signature=False):
    """Generates magnificent Four Wing attractor with butterfly-like colors."""
    width, height = image_size
    img = Image.new("RGB", image_size, "black")
    draw = ImageDraw.Draw(img)

    a, b, c = 0.2, 0.01, -0.4
    x, y, z = 1.0, 1.0, 1.0
    dt = 0.01

    points = []
    for _ in range(num_points):
        dx = a * x + y * z
        dy = b * x + c * y - x * z
        dz = -z - x * y
        x, y, z = x + dx * dt, y + dy * dt, z + dz * dt
        points.append((x, y))

    xs, ys = zip(*points)
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    range_x = max_x - min_x if max_x != min_x else 1e-6
    range_y = max_y - min_y if max_y != min_y else 1e-6

    for i, (px, py) in enumerate(points):
        x_coord = int((px - min_x) / range_x * (width - 1))
        y_coord = int((py - min_y) / range_y * (height - 1))
        ratio = i / num_points

        r = int(255 - 255 * ratio)
        g = int(165 - 165 * ratio)
        b = int(0 + 255 * ratio)

        draw.point((x_coord, y_coord), fill=(r, g, b))

    if add_signature:
        add_signature_to_image(draw, image_size)
    
    img.save(output_file, dpi=dpi)
    img.show()
    print(f"Four Wing Attractor saved as {output_file}")

# ============================================================================
# COMPREHENSIVE WALLPAPER MENU SYSTEM
# ============================================================================

def display_wallpaper_menu():
    """Display the comprehensive wallpaper generation menu."""
    print("\n" + "="*80)
    print("🎨 COMPLETE MATHEMATICAL WALLPAPER GENERATOR 🎨")
    print("="*80)
    print("Choose a wallpaper type to generate:")
    print()

    print("📊 MATHEMATICAL WALLPAPERS:")
    print("  1.  Random Mathematical Art")
    print("  2.  de Jong Attractor")
    print("  3.  Spirograph Pattern")
    print("  4.  Clifford Attractor")
    print("  5.  Hénon Attractor")
    print("  6.  Ikeda Attractor")
    print("  7.  Lorenz Attractor")
    print("  8.  Barnsley Fern")
    print("  9.  Lissajous Curve")
    print("  10. Rössler Attractor (Rainbow Spiral)")
    print("  11. Aizawa Attractor (Cosmic Butterfly)")
    print("  12. Dadras Attractor (Neon Lightning)")
    print("  13. Chen Attractor (Fiery Phoenix)")
    print("  14. Burning Ship (Molten Lava)")
    print()

    print("🚀 SPECIAL OPTIONS:")
    print("  15. Generate ALL Wallpapers")
    print("  0.  Exit")
    print()
    print("Output Directory: D:/Cool Automation Scripts/My Wallpapers/")
    print("Resolution: 4K (3840x2160) with 1000 DPI")
    print("="*80)

def get_user_choice():
    """Get user's menu choice with validation."""
    while True:
        try:
            choice = int(input("Enter your choice (0-15): ").strip())
            if 0 <= choice <= 15:
                return choice
            else:
                print("❌ Please enter a number between 0 and 15.")
        except ValueError:
            print("❌ Please enter a valid number.")

def get_signature_preference():
    """Ask user if they want to add signature to wallpapers."""
    while True:
        choice = input("Add '@aeronautyy' signature to wallpaper? (y/n): ").strip().lower()
        if choice in ['y', 'yes']:
            return True
        elif choice in ['n', 'no']:
            return False
        print("❌ Please enter 'y' for yes or 'n' for no.")

def generate_wallpaper_by_choice(choice):
    """Generate wallpaper based on user choice."""
    wallpaper_functions = {
        1:  generate_random_math_art,
        2:  generate_dejong_attractor,
        3:  generate_spirograph,
        4:  generate_clifford_attractor,
        5:  generate_henon_attractor,
        6:  generate_ikeda_attractor,
        7:  generate_lorenz_attractor,
        8:  generate_barnsley_fern,
        9:  generate_lissajous_curve,
        10: generate_rossler_attractor,
        11: generate_aizawa_attractor,
        12: generate_dadras_attractor,
        13: generate_chen_attractor,
        14: generate_burning_ship,
    }

    if choice == 0:
        print("👋 Thank you for using the Mathematical Wallpaper Generator!")
        return False
    elif choice == 15:
        print("\n🚀 Generating ALL wallpapers... This will take a while!")
        add_sig = get_signature_preference()
        print("Sit back and enjoy the mathematical beauty being created!")

        for i in range(1, 15):
            try:
                print(f"\n📊 Generating wallpaper {i}/14...")
                wallpaper_functions[i](add_signature=add_sig)
            except Exception as e:
                print(f"❌ Error generating wallpaper {i}: {e}")

        print("\n🎉 ALL WALLPAPERS GENERATED SUCCESSFULLY!")
        print("Check your wallpapers directory for amazing mathematical art!")
        return True
    elif choice in wallpaper_functions:
        add_sig = get_signature_preference()
        try:
            print(f"\n🎨 Generating your chosen wallpaper...")
            wallpaper_functions[choice](add_signature=add_sig)
            print("✅ Wallpaper generated successfully!")
        except Exception as e:
            print(f"❌ Error generating wallpaper: {e}")
        return True
    else:
        print("❌ Invalid choice. Please try again.")
        return True

def main():
    """Main function to run the wallpaper generator."""
    print("🎨 Welcome to the Complete Mathematical Wallpaper Generator!")
    print("This collection includes 14 beautiful mathematical patterns!")

    while True:
        display_wallpaper_menu()
        choice = get_user_choice()

        if not generate_wallpaper_by_choice(choice):
            break

        if choice != 25:  # Don't pause after generating all
            input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()
