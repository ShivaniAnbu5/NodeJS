let fs = require('fs');

const createDetailsService = (req,res) => {
  
    console.log("INSIDE SERVICES");
    
    try{
        const buddiesData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
        buddiesData.push(req.body);
    
        fs.writeFileSync('./cdw_ace23_buddies.json', JSON.stringify(buddiesData, null, 2));
        res.send('Created buddy');
    }
    catch(err){
        console.log(err);
    }
   

   
}

module.exports = createDetailsService;