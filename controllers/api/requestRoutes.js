const router = require("express").Router();
const { Request } = require("../../models");
const isAdmin = require("../../utils/admin");
const withAuth = require("../../utils/auth");

const sendMail = require("@sendgrid/mail");
sendMail.setApiKey(process.env.SENDGRID_API_KEY);

// GET all drivers
router.get("/", withAuth, async (req, res) => {
  try {
    const reqData = await Request.findAll({});

    res.status(200).json(reqData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newRequest = await Request.create({
      ...req.body,
      isApproved: false,
      user_id: 1,
    });
  
    res.status(200).json(newRequest);

    const newReqAlert = {
      to: `${req.session.email}`,
      from: "spworrell@gmail.com",
      subject: `Request #${newRequest.dataValues.id} has been received`,
      text: `Request #${newRequest.dataValues.id} has been received.  Someone will respond to your request soon.`,
    };
    sendMail.send(newReqAlert);
   
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  console.log(req.body);
  try {
    const approval = await Request.update(
      {
        isApproved: req.body.is_Approved,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    
    );

      console.log(approval);
      
    const approvalAlert = {
      to: `${req.session.email}`,
      from: "spworrell@gmail.com",
      subject: `Request #${req.body.id} has been ${req.body.classname}`,
      text: `Your vacation request has been ${req.body.classname}`,
    };
    sendMail.send(approvalAlert);
res.status(200).json("updated")


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
