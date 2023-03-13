import express from 'express';

export interface IController {
  basePath: string;
  router: express.Router;
}
