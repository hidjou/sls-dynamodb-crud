'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.POSTS_DYNAMODB_TABLE;

module.exports.savePost = (post) => {
  const params = {
    TableName: TABLE_NAME,
    Item: post
  };
  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return post.PostId;
    });
};
module.exports.getPost = (PostId) => {
  const params = {
    Key: {
      PostId: PostId
    },
    TableName: TABLE_NAME
  };
  return dynamo
    .get(params)
    .promise()
    .then((result) => {
      return result.Item;
    });
};
module.exports.deletetPost = (PostId) => {
  const params = {
    Key: {
      PostId: PostId
    },
    TableName: TABLE_NAME
  };
  return dynamo.delete(params).promise();
};
module.exports.updatePost = (PostId, paramsName, paramsValue) => {
  const params = {
    Key: {
      PostId: PostId
    },
    TableName: TABLE_NAME,
    ConditionExpression: 'attribute_exists(PostId)',
    UpdateExpression: 'set ' + paramsName + ' = :v',
    ExpressionAttributeValue: {
      ':v': paramsValue
    },
    ReturnValues: 'ALL_NEW'
  };
  return dynamo
    .update(params)
    .promise()
    .then((response) => {
      return response.Attributes;
    });
};
