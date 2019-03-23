import express from 'express';
const router = express.Router();

router.get('/api/v1', (req, res, next) => {
  res.send('Fully functional');
});

export default router;
