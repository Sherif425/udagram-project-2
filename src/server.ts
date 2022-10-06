import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  
  app.get("/filteredimage", async ( req : Request, res : Response ) => {
    let url = req.query.image_url;

    if (!url) {
      return res.status(400).send("Image url is required");
    }

    const filePath = await filterImageFromURL(url);
    res.sendFile(filePath, function(){
      deleteLocalFiles([filePath]);
    });
  });  
  // app.get( "/filteredimage/", async( req: Request, res: Response ) => {
  
  //   let { image_url } = req.query.image_url;
  //   const filteredImage = filterImageFromURL(image_url);
            
  //   if(filteredImage===undefined||filteredImage===null)
  //     return res.status(400).send(`Unable to filter image`);
  //   else
  //     return res.status(200).send(image_url);
  //           // return res.status(200)
  //           //           .sendFile(filteredImage);
  //    } );
  // app.get("/filteredimage?image_url={{URL}}",async(req,res)=>{
  //   console.log("in");
  //   let { image_url } = req.params.image_url;
  //   //Validate url
  //   const isValideUrl = image_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //   if(isValideUrl == null)
  //     return res.status(400).send(`Inavlid url! Try again with valid url`);
  //   else{
  //   //Process Image
  //     const filteredImage = filterImageFromURL(image_url);
  //     if(filteredImage===undefined||filteredImage===null)
  //     return res.status(400).send(`Unable to filter image`);
  //   else
  //     return res.status(200).sendFile(filteredImage+'');
  //   }
  // })
  // // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();