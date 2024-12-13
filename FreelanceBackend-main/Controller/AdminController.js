const Customer = require("../models/Customer.schema")
const Seller = require("../models/Seller.schema")
const Freelancer = require("../models/Freelance.schema")
const Project = require("../models/Projects.schema")
const SellerProjects =require("../models/SellerProjects.schema")
const Purchases =require("../models/Purchases.schema")
const Technologies =require("../models/Technology.schema")
const Admin =require("../models/Admin.schema")
const jwt = require("jsonwebtoken")

let addadmin=async (req, res) => {
  let data = req.body;
  Admin.create(data).then(data=>{
    res.status(201).json(data)
}).catch(err=>{
    res.status(500).json({"Message":"Unknown Error!"})
})
}

 let getallcutomers=async (req, res) => {
    try {
      // Fetch customers with pagination using Mongoose
      const customers = await Customer.find({})
      res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }
  };

  let getallsellers=async (req, res) => {
    try {
      // // Extracting pagination parameters from query string or using default values
      // const page = parseInt(req.query.page) || 1;
      // const pageSize = parseInt(req.query.pageSize) || 20;
  
      // // Calculate the skip value based on pagination parameters
      // const skip = (page - 1) * pageSize;
  
      // Fetch customers with pagination using Mongoose
      const seller = await Seller.find({})
        // .skip(skip)
        // .limit(pageSize)
        // .exec();
      res.status(200).json(seller);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error!' });
    }
  };

  let getallfreelancers=async (req, res) => {
    try {
      // Extracting pagination parameters from query string or using default values
      // const page = parseInt(req.query.page) || 1;
      // const pageSize = parseInt(req.query.pageSize) || 20;
  
      // // Calculate the skip value based on pagination parameters
      // const skip = (page - 1) * pageSize;
  
      // Fetch customers with pagination using Mongoose
      const freelancer = await Freelancer.find({})
        // .skip(skip)
        // .limit(pageSize)
        // .exec();
  
      res.status(200).json(freelancer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  let getallprojects=async (req, res) => {
    try {
      // Extracting pagination parameters from query string or using default values
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
  
      // Calculate the skip value based on pagination parameters
      const skip = (page - 1) * pageSize;
  
      // Fetch customers with pagination using Mongoose
      const project = await Project.find({})
        .skip(skip)
        .limit(pageSize)
        .exec();
  
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  let getallfreelanceprojectsbytechnology=async (req, res) => {
    try {
      const encodedTechnology = req.params.technology;
      const technology = decodeURIComponent(encodedTechnology);
    console.log(technology)
        const projects = await Project.find({
            Keywords: { $in: [technology] },
        })
        res.status(200).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  let getallsellerprojectsbytechnology=async (req, res) => {
    try {
        const technology = req.params.technology;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;
        const projects = await SellerProjects.find({
          Technologies: { $in: [technology] },
        })
          .skip(skip)
          .limit(pageSize)
          .exec();
        res.status(200).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  let getallsellerprojects=async(req,res)=>{
    try {
        // Extracting pagination parameters from query string or using default values
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        // Calculate the skip value based on pagination parameters
        const skip = (page - 1) * pageSize;
        // Fetch all seller projects with pagination using Mongoose
        const projects = await SellerProjects.find({})
          .skip(skip)
          .limit(pageSize)
          .exec();
        res.status(200).json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }

  let getallsellerprojectdetailbyid=async(req,res)=>{
    try {
      let id =req.params.id;
      let purchases=await Purchases.find({ProjectId:id})
      res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let getallpurchases=async(req,res)=>{
    try {
      let id =req.params.id;
      let purchases=await Purchases.find({BuyerId:id})
      res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let getallpurchasesincludedetail=async(req,res)=>{
    try {
      let id =req.params.id;
      let purchases=await Purchases.find({BuyerId:id})
      let temp=await Promise.all(
        purchases.map(async(purchase)=>{
          let sellerproject= await SellerProjects.findOne({_id:purchase.ProjectId})
          return sellerproject
        })
      )
      res.status(200).json(temp);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let getcustomerbyid=async(req,res)=>{
    try {
      let id =req.params.id;
      let user=await Customer.findOne({_id:id})
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let getallsellerprojectsbyid=async(req,res)=>{
    try {
      let id =req.params.id;
      const projects = await SellerProjects.find({
        sellerId:id,
      })
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let getallfreelanceprojectsassignedbyid =async(req,res)=>{
    try {
      let id =req.params.id;
      const projects = await Project.find({
          Assigned:id,
      })
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let getallfreelanceprojectsuploadedbyid=async(req,res)=>{
    try {
      let id =req.params.id;
      console.log(id)
      const projects = await Project.find({
          UserId:id,
      })
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let gettopfreelancers=async(req,res)=>{
    try {
      const freelancers = await Freelancer.find({});
  
      // Calculate total revenue for each freelancer based on DELIVERED projects
      const freelancersWithRevenue = await Promise.all(
        freelancers.map(async (freelancer) => {
          const projects = await Project.find({ Assigned: freelancer._id, Status: 'DELIVERED' });
          const revenue = projects.reduce((total, project) => total + (project.Budget || 0), 0);
  
          return {
            _id: freelancer._id,
            FullName: freelancer.FullName,
            Email: freelancer.Email,
            TotalRating: freelancer.TotalRating,
            TotalNumberofFeddbacks: freelancer.TotalNumberofFeddbacks,
            AccountBalance: freelancer.AccountBalance,
            Revenue: revenue,
            Contact:freelancer.Contact,
            Specialities:freelancer.Specialities
          };
        })
      );
  
      // Sort freelancers by revenue in descending order and get the top 5
      const topFreelancers = freelancersWithRevenue
        .sort((a, b) => b.Revenue - a.Revenue)
        .slice(0, 5);
  
      res.status(200).json(topFreelancers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  let gettopsellers=async(req,res)=>{
    try {
      const sellers = await Seller.find({});
  
      // Calculate total revenue for each seller
      const sellersWithRevenue = await Promise.all(
        sellers.map(async (seller) => {
          const sellerIdAsString = seller._id.toString();
          const projects = await SellerProjects.find({ sellerId: sellerIdAsString });
          const revenue = projects.reduce((total, project) => total + (project.Revenue || 0), 0);
          return {
            _id: seller._id,
            FullName: seller.FullName,
            Email: seller.Email,
            Experience: seller.Experience,
            Contact: seller.Contact,
            Role: seller.Role,
            Specialities: seller.Specialities,
            createdAt: seller.createdAt,
            updatedAt: seller.updatedAt,
            Revenue: revenue,
          };
        })
      );
  
      // Sort sellers by revenue in descending order
      const topSellers = sellersWithRevenue
        .sort((a, b) => b.Revenue - a.Revenue);
  
      res.status(200).json(topSellers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let gettopcustomers=async(req,res)=>{
    try {
      // Fetch all buyers
      const buyers = await Customer.find({});
  
      // Calculate total spending for each buyer
      const buyersWithSpending = await Promise.all(
        buyers.map(async (buyer) => {
          const buyerIdAsString = buyer._id.toString();
          // Fetch projects for the buyer with status "DELIVERED"
          const projects = await Project.find({
            UserId: buyerIdAsString,
            Status: 'DELIVERED',
          });
          // Calculate total spending for the buyer
          const totalSpending = projects.reduce(
            (acc, project) => acc + (project.Budget || 0),
            0
          );
  
          return {
            _id: buyer._id,
            FullName: buyer.FullName,
            Email: buyer.Email,
            TotalSpending: totalSpending,
            Interests:buyer.Interests
          };
        })
      );
  
      // Sort buyers by total spending in descending order
      const topCustomers = buyersWithSpending.sort(
        (a, b) => b.TotalSpending - a.TotalSpending
      );
  
      res.status(200).json(topCustomers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  function countTechnologyOccurrences(technologies) {
    const technologyCount = {};
  
    technologies.forEach((technology) => {
      technologyCount[technology] = (technologyCount[technology] || 0) + 1;
    });
  
    const result = Object.keys(technologyCount).map((technology) => ({
      name: technology,
      occurrence: technologyCount[technology],
    }));
  
    return result;
  }
  let gettopsellerscategories=async(req,res)=>{
    try {
      // Fetch all projects
      const projects = await SellerProjects.find({});
  
      // Extract technologies from all projects
      const allTechnologies = projects.reduce(
        (technologies, project) => [...technologies, ...project.Technologies],
        []
      );
      const resultArray =await countTechnologyOccurrences(allTechnologies);
      // Sort technologies by the number of occurrences in descending order
      const sortedTechnologies = resultArray.sort(
        (a, b) => b.occurrence - a.occurrence
      );
  
      // Get the top N technologies (adjust N as needed)
      // const topTechnologies = sortedTechnologies.slice(0, 5);
  
      res.status(200).json(sortedTechnologies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
let Login = async(req , res)=>{
  let {Email , Password} = req.body;
  try{
      let User = await Admin.findOne({Email});
      if(User)
      {
          console.log(User.Password)
          if(User.Password == Password)
          {
              let {Password , ...rest} = User
              let id = User._id;
              let role = User.role
              let token = await jwt.sign({id , role} ,
                   process.env.SECRET_KEY ,
                    {expiresIn :'30d'})
              res.json({rest , "Success":true , token})
          }else
          {
              res.json({ "Success":false , "Message":"Invalid password"})

          }
          
      }else
      {
          res.json({ "Success":false , "Message":"User not Found"})

      }
  }catch(err)
  {
      res.json({"Success":false , "Message":"User not Found" , err})
      
  }
  
}
let updateuserprofileById = async(req ,res)=>{
  let User=req.Tokendata
    let id = User.id;
    let data=req.body;
  let users = await Admin.findByIdAndUpdate(id , data);
    if(users)
    {
       res.status(200).json(users)
    }else
    {
      res.status(404).json({"Message":"Error"})
    }
    
}
let changepassword = async(req ,res)=>{
  let User=req.Tokendata
    let id = User.id;
    let data=req.body;
  let users = await Admin.findByIdAndUpdate(id , data);
    if(users)
    {
       res.status(200).json(users)
    }else
    {
      res.status(404).json({"Message":"Error"})
    }
    
}
let getprofile = async(req ,res)=>{
  let User=req.Tokendata
    let id = User.id;
  let users = await Admin.findOne({_id:id});
    if(users)
    {
       res.status(200).json(users)
    }else
    {
      res.status(404).json({"Message":"Error"})
    }
    
}
let gettopsellercategoriesbyrevenue=async(req,res)=>{
  try {
    // Fetch all projects
    const projects = await SellerProjects.find({});
    // Calculate revenue for each technology
    const technologyRevenue = {};
    projects.forEach((project) => {
      const { Technologies, Price } = project;
      if (Technologies && Price) {
        const projectRevenue = parseInt(Price, 10);
        Technologies.forEach((technology) => {
          technologyRevenue[technology] = (technologyRevenue[technology] || 0) + projectRevenue;
        });
      }
    });

    // Convert technologyRevenue object to an array of objects
    const technologyRevenueArray = Object.keys(technologyRevenue).map((technology) => ({
      technology,
      revenue: technologyRevenue[technology],
    }));

    // Sort technologies by revenue in descending order
    const sortedTechnologies = technologyRevenueArray.sort((a, b) => b.revenue - a.revenue);

    // Get the top 5 technologies
    const topTechnologies = sortedTechnologies.slice(0, 5);

    res.status(200).json(topTechnologies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  let gettopfreelancecategoriesbyrevenuesort=async(req,res)=>{
    try {
      // Fetch all projects
      const projects = await Project.find({});
      // Calculate revenue for each technology
      const technologyRevenue = {};
      projects.forEach((project) => {
        const { Keywords, Budget } = project;
        if (Keywords && Budget) {
          const projectRevenue = parseInt(Budget, 10);
          Keywords.forEach((technology) => {
            technologyRevenue[technology] = (technologyRevenue[technology] || 0) + projectRevenue;
          });
        }
      });
  
      // Convert technologyRevenue object to an array of objects
      const technologyRevenueArray = Object.keys(technologyRevenue).map((technology) => ({
        technology,
        revenue: technologyRevenue[technology],
      }));
  
      // Sort technologies by revenue in descending order
      const sortedTechnologies = technologyRevenueArray.sort((a, b) => b.revenue - a.revenue);
  
      // Get the top 5 technologies
      const topTechnologies = sortedTechnologies.slice(0, 5);
  
      res.status(200).json(topTechnologies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let getallnotifications=async(req,res)=>{
    try {
      // Fetch all projects
      const freelancer = await Freelancer.find({});
      const seller = await Seller.find({});
      const customer = await Customer.find({});
    
      res.status(200).json({freelancer,seller,customer});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let gettopfreelancerscategories=async(req,res)=>{
    try {
      // Fetch all projects
      const projects = await Project.find({});
  
      // Extract technologies from all projects
      const allTechnologies = projects.reduce(
        (technologies, project) => [...technologies, ...project.Keywords],
        []
      );
      const resultArray =await countTechnologyOccurrences(allTechnologies);
  
      // Sort technologies by the number of occurrences in descending order
      const sortedTechnologies = resultArray.sort(
        (a, b) => b.occurrence - a.occurrence
      );
  
      // Get the top N technologies (adjust N as needed)
      // const topTechnologies = sortedTechnologies.slice(0, 5);
  
      res.status(200).json(sortedTechnologies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  let disablefreelancer=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Freelancer.findOne({_id:id});
    if(users)
    {
        users.Blocked=true;
        users.Reason=data.reason;
        let usersupdated = await Freelancer.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }
  let disablecustomer=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Customer.findOne({_id:id});
    if(users)
    {
      users.Blocked=true;
        users.Reason=data.reason;
        let usersupdated = await Customer.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }
  let disableseller=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Seller.findOne({_id:id});
    if(users)
    {
      users.Blocked=true;
        users.Reason=data.reason;
        let usersupdated = await Seller.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }
  let ablefreelancer=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Freelancer.findOne({_id:id});
    if(users)
    {
        users.Blocked=false;
        users.Reason="";
        let usersupdated = await Freelancer.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }
  let ablecustomer=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Customer.findOne({_id:id});
    if(users)
    {
      users.Blocked=false;
      users.Reason="";
        let usersupdated = await Customer.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }
  let ableseller=async(req,res)=>{
    let data = req.body;
    let id = data.UserId;
    let users = await Seller.findOne({_id:id});
    if(users)
    {
      users.Blocked=false;
      users.Reason="";
        let usersupdated = await Seller.findByIdAndUpdate(id , users);
        if(usersupdated)
        {
           res.status(200).json(usersupdated)
        }else
        {
          res.status(404).json({"Message":"Error"})
        }
    }else
    {
      res.status(404).json({"Message":"Error"})
    } 

  }

  let getallfreelancersbyrevenuesort=async(req,res)=>{
    try {
      // Get all freelancers
      const freelancers = await Freelancer.find({});
  
      // Calculate revenue for each freelancer
      const freelancersWithRevenue = await Promise.all(
        freelancers.map(async (freelancer) => {
          // Get projects associated with the freelancer
          const projects = await Project.find({ Assigned: freelancer._id });
  
          // Calculate total revenue for the freelancer
          const revenue = projects.reduce((total, project) => total + (project.Budget || 0), 0);
  
          // Create a new object with calculated revenue
          return {
            _id: freelancer._id,
            FullName: freelancer.FullName,
            Email: freelancer.Email,
            TotalRating: freelancer.TotalRating,
            TotalNumberofFeddbacks: freelancer.TotalNumberofFeddbacks,
            AccountBalance: freelancer.AccountBalance,
            Revenue: revenue,
          };
        })
      );
  
      // Sort freelancers by revenue in descending order
      const sortedFreelancers = freelancersWithRevenue.sort((a, b) => b.Revenue - a.Revenue);
  
      res.status(200).json(sortedFreelancers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

let getallsellerprojectsbyrevenuesort=async(req,res)=>{
  try {
    // Get all seller projects
    const sellerProjects = await SellerProjects.find({});
  
    // Calculate revenue for each project
    const projectsWithRevenue = await Promise.all(
      sellerProjects.map(async (project) => {
        // Get purchases associated with the project
        const purchases = await Purchases.find({ ProjectId: project._id });
  
        // Calculate total revenue for the project
        const revenue = purchases.reduce((total, purchase) => total + project.Price, 0);
  
        // Create a new object with calculated revenue
        return {
          _id: project._id,
          Title: project.Title,
          ImageUrl: project.ImageUrl,
          ImagePaths: project.ImagePaths,
          Description: project.Description,
          Technologies: project.Technologies,
          TotalRating: project.TotalRating,
          TotalNumberofFeddbacks: project.TotalNumberofFeddbacks,
          Sales: project.Sales,
          Price: project.Price,
          Revenue: revenue,
          Projectfileurl: project.Projectfileurl,
          Projectfilepath: project.Projectfilepath,
          Feedbacks: project.Feedbacks,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        };
      })
    );
  
    // Sort projects by revenue in descending order
    const sortedProjects = projectsWithRevenue.sort((a, b) => b.Revenue - a.Revenue);
  
    res.status(200).json(sortedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
let addtechnology=async(req,res)=>{
  let data = req.body;
  Technologies.create(data).then(data=>{
      res.status(201).json(data)
  }).catch(err=>{
      res.status(500).json({"Message":"there was Some Error"})
  })
}
let deletetechnology=async(req,res)=>{
  let id = req.params.id;
    let Technology = await Technologies.findByIdAndDelete(id);
    if(Technology)
    {
       res.status(200).json(Technology)
    }else
    {
      res.status(404).json({"Message":"Error" , err:err})
    }
}
let getadminstats=async(req,res)=>{
  try {
    const sellerproject = await SellerProjects.find({});
    const totalRevenue = sellerproject.reduce((total, project) => {
      return total + project.Revenue;
    }, 0);
    const freelanceprojects = await Project.find({});
    const totalRevenuefreelence = freelanceprojects.reduce((total, project) => {
      return total + project.Budget;
    }, 0);
    let assigned=await Project.find({Status:"APPROVED"})
    let delivered=await Project.find({Status:"DELIVERED"})
    let sold=await Purchases.find({})
    let assignednumber=assigned.length;
    let deliverednumber=delivered.length;
    let soldnumber=sold.length
  // Fetch all projects
  const projects = await Project.find({});
  
  // Extract technologies from all projects
  const allTechnologies = projects.reduce(
    (technologies, project) => [...technologies, ...project.Keywords],
    []
  );
  const resultArray =await countTechnologyOccurrences(allTechnologies);
  const sortedTechnologies = resultArray.sort(
    (a, b) => b.occurrence - a.occurrence
  );
// Fetch all projects
const allsellerprojects = await SellerProjects.find({});
// Calculate revenue for each technology
const technologyRevenue = {};
allsellerprojects.forEach((project) => {
  const { Technologies, Price } = project;
  if (Technologies && Price) {
    const projectRevenue = parseInt(Price, 10);
    Technologies.forEach((technology) => {
      technologyRevenue[technology] = (technologyRevenue[technology] || 0) + projectRevenue;
    });
  }
});

const technologyRevenueArray = Object.keys(technologyRevenue).map((technology) => ({
  technology,
  revenue: technologyRevenue[technology],
}));

// Sort technologies by revenue in descending order
const sortedTechnologiesseller = technologyRevenueArray.sort((a, b) => b.revenue - a.revenue);
///////////
     // Fetch all projects
     const allfreelanceprojects = await Project.find({});
     // Calculate revenue for each technology
     const freelancetechnologyRevenue = {};
     allfreelanceprojects.forEach((project) => {
       const { Keywords, Budget } = project;
       if (Keywords && Budget) {
         const projectRevenue = parseInt(Budget, 10);
         Keywords.forEach((technology) => {
          freelancetechnologyRevenue[technology] = (freelancetechnologyRevenue[technology] || 0) + projectRevenue;
         });
       }
     });
 
     // Convert technologyRevenue object to an array of objects
     const freelancetechnologyRevenueArray = Object.keys(freelancetechnologyRevenue).map((technology) => ({
       technology,
       revenue: freelancetechnologyRevenue[technology],
     }));
 
     // Sort technologies by revenue in descending order
     const freelancesortedTechnologies = freelancetechnologyRevenueArray.sort((a, b) => b.revenue - a.revenue);
 
 
    res.status(200).json({ totalRevenue,totalRevenuefreelence,assignednumber,deliverednumber,
      soldnumber,sortedTechnologies,sortedTechnologiesseller,freelancesortedTechnologies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  module.exports  ={
    getallcutomers,
    getallsellers,
    getallfreelancers,
    getallprojects,
    getallsellerprojectsbytechnology,
    getallsellerprojects,
    getallfreelanceprojectsbytechnology,
    getallfreelanceprojectsassignedbyid,
    gettopfreelancecategoriesbyrevenuesort,
    getallfreelancersbyrevenuesort,
    getallsellerprojectsbyrevenuesort,
    getallfreelanceprojectsuploadedbyid,
    getallsellerprojectsbyid,
    gettopfreelancers,
    Login,
    gettopsellers,
    gettopcustomers,
    gettopsellerscategories,
    gettopsellercategoriesbyrevenue,
    addtechnology,
    deletetechnology,
    gettopfreelancerscategories,
    disablefreelancer,
    disablecustomer,
    disableseller,
    ablecustomer,
    ableseller,
    ablefreelancer,
    addadmin,
    updateuserprofileById,
    getprofile,
    changepassword,
    getallsellerprojectdetailbyid,
    getcustomerbyid,
    getallpurchases,
    getallnotifications,
    getallpurchasesincludedetail,
    getadminstats
}
