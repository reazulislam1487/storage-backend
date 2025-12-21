import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import Favorite from "./favorite.model.js";

const router = Router();
router.use(auth);

router.post("/", async (req, res) => {
  const fav = await Favorite.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: fav });
});

router.get("/", async (req, res) => {
  const favs = await Favorite.find({ userId: req.user.id }).populate("itemId");
  res.json({
    success: true,
    data: favs,
  });
});

router.delete("/:id", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
