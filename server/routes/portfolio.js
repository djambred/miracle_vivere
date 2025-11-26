import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all portfolios (public)
router.get('/', async (req, res) => {
  try {
    const { category, tag, featured, status = 'published' } = req.query;
    const filter = { status };
    
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (featured) filter.featured = featured === 'true';
    
    const portfolios = await Portfolio.find(filter)
      .sort({ date: -1 });
    
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single portfolio by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create portfolio (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: 'Error creating portfolio', error: error.message });
  }
});

// Update portfolio (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: 'Error updating portfolio', error: error.message });
  }
});

// Delete portfolio (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tags
router.get('/meta/tags', async (req, res) => {
  try {
    const tags = await Portfolio.distinct('tags');
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;