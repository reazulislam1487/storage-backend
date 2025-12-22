import User from "../modules/auth/auth.model.js";

const appLockGuard = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user?.isLocked) {
    return res.status(423).json({
      success: false,
      message: "App is locked. Please enter PIN.",
    });
  }

  next();
};

export default appLockGuard;
