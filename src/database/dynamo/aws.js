const AWS = require("aws-sdk")

const TABLE_NAME = "forSale"

const GUEST_USER_CREDS = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "YOUR CREDENTIALS HERE",
  region: "ap-southeast-2",
})

const getForSale = function (req, res) {
  return new Promise((resolve, reject) => {
    AWS.config.credentials = GUEST_USER_CREDS
    AWS.config.update({ region: "ap-southeast-2" })
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: TABLE_NAME,
    }
    docClient.scan(params, async function (err, data) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        const { Items } = data
        console.log(Items)
        resolve(Items)
      }
    })
  })
}

const putForSale = async function (req, res) {
  AWS.config.credentials = GUEST_USER_CREDS
  AWS.config.update({ region: "ap-southeast-2" })
  const docClient = new AWS.DynamoDB.DocumentClient()
  var params = {
    TableName: TABLE_NAME,
    Item: {
      eventID: req["eventID"],
      tokenID: req["id"],
      title: req["title"],
      ticketno: req["ticketno"],
      address: req["address"],
      date: req["date"],
      venue: req["venue"],
    },
  }
  await docClient.put(params, function (err, data) {
    if (err) {
      console.log(err)
      alert(err)
    } else {
      console.log(data)
      alert("Ticket listed successfully")
    }
  })
}

const removeFromSale = function (req, res) {
  return new Promise((resolve, reject) => {
    AWS.config.credentials = GUEST_USER_CREDS
    AWS.config.update({ region: "ap-southeast-2" })
    const docClient = new AWS.DynamoDB.DocumentClient()
    const params = {
      TableName: TABLE_NAME,
      Key: {
        tokenID: req["tokenID"],
      },
    }
    docClient.delete(params, function (err, data) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(data)
        resolve(data)
      }
    })
  })
}


module.exports = { getForSale, putForSale, removeFromSale }
