import express from 'express';
import SEO from '../models/SEO.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get SEO data for a page (public)
router.get('/:page', async (req, res) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    
    if (!seo) {
      return res.status(404).json({ message: 'SEO data not found' });
    }
    
    res.json(seo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all SEO pages (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const seos = await SEO.find();
    res.json(seos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update SEO data (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { page } = req.body;
    
    const seo = await SEO.findOneAndUpdate(
      { page },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json(seo);
  } catch (error) {
    res.status(400).json({ message: 'Error saving SEO data', error: error.message });
  }
});

// Delete SEO data (admin only)
router.delete('/:page', authenticate, isAdmin, async (req, res) => {
  try {
    const seo = await SEO.findOneAndDelete({ page: req.params.page });
    
    if (!seo) {
      return res.status(404).json({ message: 'SEO data not found' });
    }
    
    res.json({ message: 'SEO data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;