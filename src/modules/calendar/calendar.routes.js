import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import { getCalendarItemsByDate } from "./calendar.service.js";

const router = Router();
router.use(auth);


router.get("/items", async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    const data = await getCalendarItemsByDate(userId, date);

    res.json({
      success: true,
      ...data,
    });
  } catch (err) {
    if (err.message === "DATE_REQUIRED") {
      return res.status(400).json({
        success: false,
        message: "date query required (YYYY-MM-DD)",
      });
    }

    console.error("Calendar Error:", err);
    res.status(500).json({
      success: false,
      message: "Calendar fetch failed",
    });
  }
});

export default router;
