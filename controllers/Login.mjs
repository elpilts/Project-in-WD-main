import dotenv from 'dotenv';

if (process.env.NODE_ENV != 'production'){
   dotenv.config();
}

//Picking model from file .env
const model = await import(`../model/model-${process.env.MODEL}.mjs`);

export async function checkAuthenticated (req, res, next){
    if (req.session.memberData)
        next()
    else{
        console.log("only for members")
        return res.redirect('/home')
    }
}

export async function memberLogin(req, res) {
    try {
      const memberData = await model.memberLogin(req.body.email);
      if (memberData && memberData.length > 0) {
        return memberData;
      } else {
        return null; 
      }
    } catch (err) {
      res.send(err);
    }
  }

  