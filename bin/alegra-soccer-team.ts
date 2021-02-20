#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as dotenv from "dotenv";
import { DynamoStack } from '../lib/dynamo-stack';

dotenv.config();

const app = new cdk.App();
const appName = "alegra-soccer-team";
const env = process.env.ENVIRONMENT || "";

if (["testing", "production"].indexOf(env) === -1) {
  throw Error("Env not supported");
}

const sharedProps = {
  env: env,
  account: process.env.AWS_ACCOUNT_ID || "",
  region: process.env.AWS_ACCOUNT_REGION || "",
};

new DynamoStack(app, 'DynamoStack', {
  ...sharedProps,
  name: `${appName}-dynamo-${env}`
});
