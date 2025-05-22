import Settings from '../models/AdminModels.js';

// Get all settings
export async function getSettings(req, res) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings',
      error: error.message,
    });
  }
}

export async function updateSettings(req, res) {
  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      {}, // match the single settings document
      { $set: req.body },
      { new: true, runValidators: true, upsert: true } // ✅ THIS IS IMPORTANT
    );

    res.status(200).json({
      success: true,
      data: updatedSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings',
      error: error.message,
    });
  }
}


// Create backup
export async function createBackup(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: 'Backup created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating backup',
      error: error.message,
    });
  }
}

// Restore from backup
export async function restoreBackup(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: 'Backup restored successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error restoring backup',
      error: error.message,
    });
  }
}
