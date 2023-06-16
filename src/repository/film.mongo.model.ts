// T import { Schema, model } from 'mongoose';
// import { Film } from '../entities/film';

// const filmSchema = new Schema<Film>({
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   owner:{
//     type: Schema.Types.ObjectId,// Permite crear relaciones entre tablas con mongoose
//     ref: 'User'
//   }
// });

// filmSchema.set('toJSON', {
//   transform(_document, returnedObject) {
//     returnedObject.id = returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject._id;
//     delete returnedObject.passwd;
//   },
// });

// export const FilmModel = model('Film', filmSchema, 'films')
