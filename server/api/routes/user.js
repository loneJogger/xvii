import express from "express";

const userRouter = express.Router();

/**
 * creates a new user
 */
userRouter.post("/", (req, res, next) => {});

/**
 * returns a single user
 */
userRouter.get("/:id", (req, res, next) => {});

/**
 * lists all users
 */
userRouter.get("/", (req, res, next) => {});

/**
 * updates a user
 */
userRouter.put("/:id", (req, res, next) => {});

/**
 * deletes a user
 */
userRouter.delete("/:id", (req, res, next) => {});

export default userRouter;
