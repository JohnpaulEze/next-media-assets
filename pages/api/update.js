import { v2 as Cloudinary } from "cloudinary";

export default function handler(req, res) {
  //const publicID = req.body;
  try {
    Cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true
    });

    //console.log(publicID);

    const imageUpdate = Cloudinary.api.update(
      "color-effect/afro",
      { categorization: "google_tagging", auto_tagging: 0.9 },
      function (error, result) {
        console.log(result, error);
        return result;
      }
    );
    imageUpdate.then((data) => {
      res.status(200).json(data.tags[0]);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
}
