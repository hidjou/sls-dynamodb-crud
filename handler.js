'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
    isBase64Encoded: false
  };
}

module.exports.savePost = (event, context, callback) => {
  // console.log(event.body);
  const post = JSON.parse(event.body);
  post.PostId = uuidv1();

  databaseManager
    .savePost(post)
    .then((response) => {
      console.log(response);
      callback(null, createResponse(200, response));
    })
    .catch((err) => console.log(err));
};

module.exports.getPost = (event, context, callback) => {
  const postId = event.pathParameters.postId;

  databaseManager.getPost(postId).then((response) => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.deletePost = (event, context, callback) => {
  const postId = event.pathParameters.postId;

  databaseManager
    .deletePost(postId)
    .then((response) => {
      callback(null, createResponse(200, 'Item was deleted'));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updatePost = (event, context, callback) => {
  const postId = event.pathParameters.postId;

  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValue = body.paramValue;

  databaseManager.updatePost(postId, paramName, paramValue).then((response) => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};
