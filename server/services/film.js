import { Film } from "../database/models/film.js";

const create = async (film) => {
  return await Film.create(film);
};

export default { create };
