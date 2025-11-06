#!/usr/bin/env python3
"""Generate extension icons with a moon/chart theme"""

from PIL import Image, ImageDraw
import math
import os

def create_gradient_background(size):
    """Create a purple gradient background"""
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)

    for y in range(size):
        # Gradient from #667eea to #764ba2
        r = int(102 + (118 - 102) * y / size)
        g = int(126 + (75 - 126) * y / size)
        b = int(234 + (162 - 234) * y / size)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    return img

def draw_moon(draw, size):
    """Draw a crescent moon icon"""
    center_x = size // 2
    center_y = size // 2
    moon_radius = int(size * 0.35)

    # Draw the full moon circle (white)
    draw.ellipse(
        [center_x - moon_radius, center_y - moon_radius,
         center_x + moon_radius, center_y + moon_radius],
        fill='white'
    )

    # Draw shadow circle to create crescent effect
    shadow_offset_x = int(moon_radius * 0.4)
    shadow_offset_y = int(-moon_radius * 0.2)
    shadow_radius = int(moon_radius * 0.85)

    # Use gradient color for shadow (approximate middle of gradient)
    shadow_color = (94, 100, 198)

    draw.ellipse(
        [center_x + shadow_offset_x - shadow_radius,
         center_y + shadow_offset_y - shadow_radius,
         center_x + shadow_offset_x + shadow_radius,
         center_y + shadow_offset_y + shadow_radius],
        fill=shadow_color
    )

def generate_icon(size, filename):
    """Generate a single icon of the specified size"""
    img = create_gradient_background(size)
    draw = ImageDraw.Draw(img)
    draw_moon(draw, size)

    # Add subtle border for larger icons
    if size >= 48:
        border_width = max(1, size // 32)
        center_x = size // 2
        center_y = size // 2
        moon_radius = int(size * 0.35)

        draw.ellipse(
            [center_x - moon_radius, center_y - moon_radius,
             center_x + moon_radius, center_y + moon_radius],
            outline=(255, 255, 255, 77),
            width=border_width
        )

    img.save(filename, 'PNG')
    print(f"✓ Generated {filename} ({size}x{size})")

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
icons_dir = os.path.join(script_dir, 'icons')

# Create icons directory if it doesn't exist
os.makedirs(icons_dir, exist_ok=True)

# Generate all three icon sizes
generate_icon(16, os.path.join(icons_dir, 'icon16.png'))
generate_icon(48, os.path.join(icons_dir, 'icon48.png'))
generate_icon(128, os.path.join(icons_dir, 'icon128.png'))

print("\n✅ All icons generated successfully!")
