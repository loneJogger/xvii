import express from "express";
import auth from "../middleware/auth.js";
import filmService from "../../services/film.js";

const filmRouter = express.Router();

/**
 * creates a new film
 */
filmRouter.post("/", auth, async (req, res, next) => {
  try {
    console.log(req.body);
    const newFilm = await filmService.create(req.body);
    res.status(200).send(newFilm);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * returns a single film
 */
filmRouter.get("/:id", (req, res, next) => {});

/**
 * lists films
 */
filmRouter.get("/", (req, res, next) => {});

/**
 * updates a film
 */
filmRouter.put("/:id", auth, (req, res, next) => {});

/**
 * deletes a film
 */
filmRouter.delete("/:id", auth, (req, res, next) => {});

export default filmRouter;
