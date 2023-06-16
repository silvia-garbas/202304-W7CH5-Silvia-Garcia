/* eslint-disable capitalized-comments */
// import { FilmModel } from './film.mongo.model.js';
// import createDebug from 'debug';
// import { Film } from '../entities/film.js';
// import { Repo } from './repo.js';
// import { HttpError } from '../types/http.error.js';
// const debug = createDebug('W6:FilmRepo');

// export class FilmRepo implements Repo<Film> {
//   constructor() {
//     debug('Instantiated');
//   }

//   async query(): Promise<Film[]> {
//     const aData = await FilmModel.find().populate('owner', {films: 0}).exec();
//     return aData;
//   }

//   async queryById(id: string): Promise<Film> {
//     const result = await FilmModel.findById(id).populate('owner', {films: 0}).exec();
//     // Ejecuta la función findById y Devuelve un objeto que tiene la propeidad populate
//     // lo único que pued ellevar un . delante es eun objeto
//     // la propiedad populate, lo único en js que puede llever () es una función
//    // populate devuelve un objeto
//     if (result === null)
//       throw new HttpError(404, 'Not found', 'Bad id for the query');
//     return result;

//     // Result vale lo que devuelva exec
//   }

//   async search({
//     key,
//     value,
//   }: {
//     key: string;
//     value: unknown;
//   }): Promise<Film[]> {
//     const result = await FilmModel.find({ [key]: value }).exec();
//     return result;
//   }

//   async create(data: Omit<Film, 'id'>): Promise<Film> {
//     const newFilm = await FilmModel.create(data);
//     return newFilm;
//   }

//   async update(id: string, data: Partial<Film>): Promise<Film> {
//     const newBook = await FilmModel.findByIdAndUpdate(id, data, {
//       new: true,
//     })
//       .populate('owner', { films: 0 })
//       .exec();
//     if (newBook === null)
//       throw new HttpError(404, 'Not found', 'Bad id for the update');
//     return newBook;
//   }

//   async delete(id: string): Promise<void> {
//     const result = await FilmModel.findByIdAndDelete(id).exec();
//     if (result === null)
//       throw new HttpError(404, 'Not found', 'Bad id for the delete');
//   }
// }
