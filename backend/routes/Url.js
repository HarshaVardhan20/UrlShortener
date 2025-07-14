import express from "express";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorturls", async (req, res) => {
  const { url, shortcode, validity } = req.body;
  if (!url || !shortcode || !validity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existing = await Url.findOne({ shortcode });
  if (existing) {
    return res.status(409).json({ error: "Shortcode already exists." });
  }

  const expiresAt = new Date(Date.now() + validity * 60000);
  const newUrl = new Url({ shortcode, longUrl: url, expiresAt });
  await newUrl.save();

  res.status(201).json({ shortUrl: `http://localhost:3000/${shortcode}` });
});

router.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  const url = await Url.findOne({ shortcode });

  if (!url) return res.status(404).json({ error: "URL not found" });
  if (new Date() > url.expiresAt) return res.status(410).json({ error: "URL expired" });

  url.clicks.push({
    timestamp: new Date(),
    ip: req.ip,
    user: req.get("User-Agent")
  });

  await url.save();
  res.redirect(url.longUrl);
});

router.get("/shorturls/:shortcode", async (req, res) => {
  const url = await Url.findOne({ shortcode: req.params.shortcode });
  if (!url) return res.status(404).json({ error: "URL not found" });

  res.json({
    longUrl: url.longUrl,
    totalClicks: url.clicks.length,
    clicks: url.clicks
  });
});

export default router;