/**
 * Stripe Session Validation API Endpoint
 * This is a basic Node.js/Express endpoint for validating Stripe sessions
 * Deploy this to your server or use a serverless function
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// For Express.js
const validateSession = async (req, res) => {
    try {
        const { sessionId } = req.body;

        // Validate session ID format
        if (!sessionId || !sessionId.startsWith('cs_')) {
            return res.status(400).json({ 
                valid: false, 
                error: 'Invalid session ID format' 
            });
        }

        // Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if session is valid and paid
        const isValid = session && 
                       session.payment_status === 'paid' && 
                       session.status === 'complete';

        // Optional: Check if session was created recently (within last 24 hours)
        const sessionAge = Date.now() - (session.created * 1000);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
            return res.status(400).json({ 
                valid: false, 
                error: 'Session expired' 
            });
        }

        res.json({ 
            valid: isValid,
            sessionId: sessionId,
            paymentStatus: session.payment_status,
            status: session.status
        });

    } catch (error) {
        console.error('Session validation error:', error);
        res.status(500).json({ 
            valid: false, 
            error: 'Internal server error' 
        });
    }
};

// For serverless functions (Vercel, Netlify, etc.)
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    return validateSession(req, res);
};

// For Express.js
module.exports.validateSession = validateSession;
