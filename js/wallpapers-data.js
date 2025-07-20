/**
 * Mathematical Wallpapers Data
 * Contains all wallpaper information for dynamic loading
 */

const wallpapersData = [
    // Mathematical wallpapers (no fractals)
    {
        name: 'Lorenz Attractor',
        filename: 'lorenz_attractor.png',
        description: 'The famous "butterfly effect" attractor that demonstrates sensitive dependence on initial conditions.',
        equation: '\\frac{dx}{dt} = \\sigma(y-x) \\\\ \\frac{dy}{dt} = x(\\rho-z)-y \\\\ \\frac{dz}{dt} = xy-\\beta z',
        category: 'Attractor',
        color: 'red'
    },
    {
        name: 'Barnsley Fern',
        filename: 'barnsley_fern.png',
        description: 'A nature-inspired fractal created using an Iterated Function System (IFS).',
        equation: '\\begin{pmatrix} x_{n+1} \\\\ y_{n+1} \\end{pmatrix} = A_i \\begin{pmatrix} x_n \\\\ y_n \\end{pmatrix} + \\begin{pmatrix} b_i \\\\ c_i \\end{pmatrix}',
        category: 'IFS',
        color: 'green'
    },
    {
        name: 'Clifford Attractor',
        filename: 'clifford_attractor.png',
        description: 'A mesmerizing strange attractor with intricate spiral patterns and beautiful symmetries.',
        equation: 'x_{n+1} = \\sin(ay_n) + c\\cos(ax_n) \\\\ y_{n+1} = \\sin(bx_n) + d\\cos(by_n)',
        category: 'Attractor',
        color: 'cyan'
    },

    // Additional wallpapers
    {
        name: 'Random Math Art',
        filename: 'random_math_art.png',
        description: 'Random mathematical art using sine-cosine functions with vibrant colors.',
        equation: 'x = \\sin(at) + \\sin(bt), \\quad y = \\cos(ct) + \\cos(dt)',
        category: 'Art',
        color: 'indigo'
    },
    {
        name: 'De Jong Attractor',
        filename: 'dejong_attractor.png',
        description: 'De Jong attractor with beautiful gradient and complex dynamics.',
        equation: 'x_{n+1} = \\sin(ay_n) - \\cos(bx_n) \\\\ y_{n+1} = \\sin(cx_n) - \\cos(dy_n)',
        category: 'Attractor',
        color: 'pink'
    },
    {
        name: 'Spirograph',
        filename: 'spirograph.png',
        description: 'Beautiful spirograph pattern with geometric precision and artistic flair.',
        equation: 'x = (R-r)\\cos(t) + d\\cos\\left(\\frac{R-r}{r}t\\right) \\\\ y = (R-r)\\sin(t) - d\\sin\\left(\\frac{R-r}{r}t\\right)',
        category: 'Pattern',
        color: 'yellow'
    },
    {
        name: 'Hénon Attractor',
        filename: 'henon_attractor.png',
        description: 'Hénon map attractor showing chaotic dynamics in discrete systems.',
        equation: '\\begin{align} x_{n+1} &= 1 - ax_n^2 + y_n \\\\ y_{n+1} &= bx_n \\end{align}',
        category: 'Attractor',
        color: 'teal'
    },
    {
        name: 'Ikeda Attractor',
        filename: 'ikeda_attractor.png',
        description: 'Ikeda map attractor with laser-like patterns and optical dynamics.',
        equation: 't_n = 0.4 - \\frac{6}{1 + x_n^2 + y_n^2} \\\\ x_{n+1} = 1 + u(x_n\\cos t_n - y_n\\sin t_n)',
        category: 'Attractor',
        color: 'violet'
    },
    {
        name: 'Lissajous Curve',
        filename: 'lissajous_curve.png',
        description: 'Lissajous curve with turquoise-magenta gradient showing harmonic motion.',
        equation: 'x = A\\sin(at + \\delta), \\quad y = B\\sin(bt)',
        category: 'Curve',
        color: 'emerald'
    },
    {
        name: 'Rössler Attractor',
        filename: 'rossler_attractor.png',
        description: 'Stunning Rössler attractor with rainbow gradient and chaotic beauty.',
        equation: '\\frac{dx}{dt} = -y - z, \\quad \\frac{dy}{dt} = x + ay, \\quad \\frac{dz}{dt} = b + z(x - c)',
        category: 'Attractor',
        color: 'rose'
    },
    {
        name: 'Aizawa Attractor',
        filename: 'aizawa_attractor.png',
        description: 'Mesmerizing Aizawa attractor with cosmic colors and complex dynamics.',
        equation: '\\frac{dx}{dt} = (z-b)x - dy \\\\ \\frac{dy}{dt} = dx + (z-b)y \\\\ \\frac{dz}{dt} = c + az - \\frac{z^3}{3}',
        category: 'Attractor',
        color: 'sky'
    },
    {
        name: 'Dadras Attractor',
        filename: 'dadras_attractor.png',
        description: 'Electric Dadras attractor with neon lightning effect and dynamic patterns.',
        equation: '\\frac{dx}{dt} = y - ax + byz \\\\ \\frac{dy}{dt} = cy - xz + z \\\\ \\frac{dz}{dt} = dxy - ez',
        category: 'Attractor',
        color: 'lime'
    },
    {
        name: 'Chen Attractor',
        filename: 'chen_attractor.png',
        description: 'Fiery Chen attractor with phoenix-like colors and chaotic dynamics.',
        equation: '\\frac{dx}{dt} = a(y - x) \\\\ \\frac{dy}{dt} = (c - a)x - xz + cy \\\\ \\frac{dz}{dt} = xy - bz',
        category: 'Attractor',
        color: 'amber'
    },



    {
        name: 'Four Wing Attractor',
        filename: 'four_wing_attractor.png',
        description: 'Magnificent Four Wing attractor with butterfly-like colors and symmetric beauty.',
        equation: '\\frac{dx}{dt} = ax + yz \\\\ \\frac{dy}{dt} = bx + cy - xz \\\\ \\frac{dz}{dt} = -z - xy',
        category: 'Attractor',
        color: 'indigo'
    }
];

// Color mapping for categories
const categoryColors = {
    'Fractal': 'blue',
    'Attractor': 'red',
    'IFS': 'green',
    'Art': 'indigo',
    'Pattern': 'yellow',
    'Curve': 'emerald',
    'Map': 'pink'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { wallpapersData, categoryColors };
}
