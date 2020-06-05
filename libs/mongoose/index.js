import mongoose from 'mongoose';

export const initMongoose = ({ host, port, name, initCallback }) => {
  const mongodbURI = `mongodb://${host}:${port}/${name}`;

  mongoose.connect(
    mongodbURI,
    { useNewUrlParser: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        initCallback && initCallback();
      }
    }
  );
};
