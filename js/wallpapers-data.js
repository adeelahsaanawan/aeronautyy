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
        color: 'red',
        buyButtonUrl: 'https://buy.stripe.com/00w28r5MgcPw23e7pp7wA03'
    },
    {
        name: 'Barnsley Fern',
        filename: 'barnsley_fern.png',
        description: 'A nature-inspired fractal created using an Iterated Function System (IFS).',
        equation: '\\begin{pmatrix} x_{n+1} \\\\ y_{n+1} \\end{pmatrix} = A_i \\begin{pmatrix} x_n \\\\ y_n \\end{pmatrix} + \\begin{pmatrix} b_i \\\\ c_i \\end{pmatrix}',
        category: 'IFS',
        color: 'green',
        buyButtonUrl: 'https://buy.stripe.com/dRm6oHcaEeXE4bmbFF7wA04'
    },
    {
        name: 'Clifford Attractor',
        filename: 'clifford_attractor.png',
        description: 'A mesmerizing strange attractor with intricate spiral patterns and beautiful symmetries.',
        equation: 'x_{n+1} = \\sin(ay_n) + c\\cos(ax_n) \\\\ y_{n+1} = \\sin(bx_n) + d\\cos(by_n)',
        category: 'Attractor',
        color: 'cyan',
        buyButtonUrl: 'https://buy.stripe.com/cNi5kDb6A8zg4bm5hh7wA05'
    },

    // Additional wallpapers
    {
        name: 'Random Math Art',
        filename: 'random_math_art.png',
        description: 'Random mathematical art using sine-cosine functions with vibrant colors.',
        equation: 'x = \\sin(at) + \\sin(bt), \\quad y = \\cos(ct) + \\cos(dt)',
        category: 'Art',
        color: 'indigo',
        buyButtonUrl: 'https://buy.stripe.com/3cI28rb6A8zg7ny6ll7wA06'
    },
    {
        name: 'De Jong Attractor',
        filename: 'dejong_attractor.png',
        description: 'De Jong attractor with beautiful gradient and complex dynamics.',
        equation: 'x_{n+1} = \\sin(ay_n) - \\cos(bx_n) \\\\ y_{n+1} = \\sin(cx_n) - \\cos(dy_n)',
        category: 'Attractor',
        color: 'pink',
        buyButtonUrl: 'https://buy.stripe.com/4gMdR91w02aS5fqdNN7wA07'
    },
    {
        name: 'Spirograph',
        filename: 'spirograph.png',
        description: 'Beautiful spirograph pattern with geometric precision and artistic flair.',
        equation: 'x = (R-r)\\cos(t) + d\\cos\\left(\\frac{R-r}{r}t\\right) \\\\ y = (R-r)\\sin(t) - d\\sin\\left(\\frac{R-r}{r}t\\right)',
        category: 'Pattern',
        color: 'yellow',
        buyButtonUrl: 'https://buy.stripe.com/dRm4gzcaEaHobDOeRR7wA08'
    },
    {
        name: 'Hénon Attractor',
        filename: 'henon_attractor.png',
        description: 'Hénon map attractor showing chaotic dynamics in discrete systems.',
        equation: '\\begin{align} x_{n+1} &= 1 - ax_n^2 + y_n \\\\ y_{n+1} &= bx_n \\end{align}',
        category: 'Attractor',
        color: 'teal',
        buyButtonUrl: 'https://buy.stripe.com/28EcN57Uo5n40Za6ll7wA09'
    },
    {
        name: 'Ikeda Attractor',
        filename: 'ikeda_attractor.png',
        description: 'Ikeda map attractor with laser-like patterns and optical dynamics.',
        equation: 't_n = 0.4 - \\frac{6}{1 + x_n^2 + y_n^2} \\\\ x_{n+1} = 1 + u(x_n\\cos t_n - y_n\\sin t_n)',
        category: 'Attractor',
        color: 'violet',
        buyButtonUrl: 'https://buy.stripe.com/fZu9AT4IceXE37i8tt7wA0a'
    },
    {
        name: 'Lissajous Curve',
        filename: 'lissajous_curve.png',
        description: 'Lissajous curve with turquoise-magenta gradient showing harmonic motion.',
        equation: 'x = A\\sin(at + \\delta), \\quad y = B\\sin(bt)',
        category: 'Curve',
        color: 'emerald',
        buyButtonUrl: 'https://buy.stripe.com/dRm5kD4IcbLs9vG2557wA0b'
    },
    {
        name: 'Rössler Attractor',
        filename: 'rossler_attractor.png',
        description: 'Stunning Rössler attractor with rainbow gradient and chaotic beauty.',
        equation: '\\frac{dx}{dt} = -y - z, \\quad \\frac{dy}{dt} = x + ay, \\quad \\frac{dz}{dt} = b + z(x - c)',
        category: 'Attractor',
        color: 'rose',
        buyButtonUrl: 'https://buy.stripe.com/8x2dR9fmQbLsfU41117wA0c'
    },
    {
        name: 'Aizawa Attractor',
        filename: 'aizawa_attractor.png',
        description: 'Mesmerizing Aizawa attractor with cosmic colors and complex dynamics.',
        equation: '\\frac{dx}{dt} = (z-b)x - dy \\\\ \\frac{dy}{dt} = dx + (z-b)y \\\\ \\frac{dz}{dt} = c + az - \\frac{z^3}{3}',
        category: 'Attractor',
        color: 'sky',
        buyButtonUrl: 'https://buy.stripe.com/cNi6oHcaEbLs37ibFF7wA0d'
    },
    {
        name: 'Dadras Attractor',
        filename: 'dadras_attractor.png',
        description: 'Electric Dadras attractor with neon lightning effect and dynamic patterns.',
        equation: '\\frac{dx}{dt} = y - ax + byz \\\\ \\frac{dy}{dt} = cy - xz + z \\\\ \\frac{dz}{dt} = dxy - ez',
        category: 'Attractor',
        color: 'lime',
        buyButtonUrl: 'https://buy.stripe.com/5kQ3cv8Ys5n423eaBB7wA0e'
    },
    {
        name: 'Chen Attractor',
        filename: 'chen_attractor.png',
        description: 'Fiery Chen attractor with phoenix-like colors and chaotic dynamics.',
        equation: '\\frac{dx}{dt} = a(y - x) \\\\ \\frac{dy}{dt} = (c - a)x - xz + cy \\\\ \\frac{dz}{dt} = xy - bz',
        category: 'Attractor',
        color: 'amber',
        buyButtonUrl: 'https://buy.stripe.com/dRmfZh5Mg9DkbDOdNN7wA0f'
    },



    {
        name: 'Four Wing Attractor',
        filename: 'four_wing_attractor.png',
        description: 'Magnificent Four Wing attractor with butterfly-like colors and symmetric beauty.',
        equation: '\\frac{dx}{dt} = ax + yz \\\\ \\frac{dy}{dt} = bx + cy - xz \\\\ \\frac{dz}{dt} = -z - xy',
        category: 'Attractor',
        color: 'indigo',
        buyButtonUrl: 'https://buy.stripe.com/28EeVdb6A6r823eeRR7wA0g'
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
