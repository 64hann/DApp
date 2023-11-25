const AWS = require("aws-sdk");

const TABLE_NAME = "forSale";

const GUEST_USER_CREDS = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "ap-southeast-2:ed87b1b6-1beb-4218-b806-5eb7f74affd3",
  region: "ap-southeast-2",
});

const getForSale =  function (req, res) {
    return new Promise((resolve, reject) => {
  AWS.config.credentials = GUEST_USER_CREDS;
  AWS.config.update({ region: "ap-southeast-2" });
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: TABLE_NAME,
  };
    docClient.scan(params, async function (err, data) {
    if (err) {
      console.log(err);
      reject(err)
    } else {
      const { Items } = data;
      console.log(Items);
      resolve(Items);

    }
  });
});
}

const putForSale = async function (req, res) {
  AWS.config.credentials = GUEST_USER_CREDS;
  AWS.config.update({ region: "ap-southeast-2" });
  const docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: TABLE_NAME,
    Item: { 
        tokenID: req['title'] + ";" + req['ticketno'],
        title : req['title'],
        ticketno : req['ticketno'],
     },
  };
  await docClient.put(params, function (err, data) {
    if (err) {
      console.log(err);
      alert(err);
    } else {
      console.log(data);
      alert("Ticket listed successfully");
    }
  });
};

const removeFromSale = function (req, res) {
  AWS.config.credentials = GUEST_USER_CREDS;
  AWS.config.update({ region: "ap-southeast-2" });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: TABLE_NAME,
    Key: {
      tokenID: req["title"] + ";" + req["ticketno"],
    },
  };
  docClient.delete(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      // res.send({
      //   success: true,
      //   message: "Item deleted successfully",
      // });
    }
  });
};

module.exports = { getForSale, putForSale, removeFromSale };
