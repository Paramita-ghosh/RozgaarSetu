import visionClient from '../config/vision.js';
import Worker from '../models/Worker.model.js';

/**
 * @desc    Register worker with ID verification + live location
 * @route   POST /api/workers/register
 * @access  Private
 */
export const createWorkerProfile = async (req, res) => {
  try {
    const { skills, pricePerHour, bio, userId, lng, lat } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'ID proof image is required' });
    }

    // 🔍 AI Vision ID verification
    const [result] = await visionClient.textDetection(req.file.path);
    const extractedText =
      result.textAnnotations?.[0]?.description?.toLowerCase() || '';

    const keywords = [
      'aadhaar',
      'identity',
      'government',
      'india',
      'card'
    ];

    const isVerified = keywords.some(word =>
      extractedText.includes(word)
    );

    // ❌ Prevent duplicate profiles
    const existing = await Worker.findOne({ userId });
    if (existing) {
      return res.status(409).json({ message: 'Worker profile already exists' });
    }

    // 📍 Create worker profile with GeoJSON
    const worker = new Worker({
      userId,
      skills: JSON.parse(skills),
      pricePerHour: Number(pricePerHour),
      bio,
      isVerified,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    await worker.save();

    res.status(201).json({
      success: true,
      verified: isVerified,
      message: isVerified
        ? 'AI verified successfully'
        : 'ID requires manual review'
    });
  } catch (error) {
    console.error('Worker Registration Error:', error);
    res.status(500).json({
      message: 'Worker registration failed',
      error: error.message
    });
  }
};

/**
 * @desc    Get worker profile by Firebase UID
 * @route   GET /api/workers/:uid
 * @access  Private
 */
export const getWorkerProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    const worker = await Worker.findOne({ userId: uid });

    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found' });
    }

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

/**
 * @desc    Hyperlocal search using GeoJSON + MongoDB 2dsphere
 * @route   GET /api/workers/nearby
 * @access  Public
 */
export const getNearbyWorkers = async (req, res) => {
  try {
    const { lng, lat, radius = 5000 } = req.query;

    if (!lng || !lat) {
      return res
        .status(400)
        .json({ message: 'Latitude and Longitude required' });
    }

    const workers = await Worker.find({
      isVerified: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    res.status(200).json(workers);
  } catch (error) {
    console.error('Nearby Search Error:', error);
    res.status(500).json({
      message: 'Failed to search nearby workers',
      error: error.message
    });
  }
};
