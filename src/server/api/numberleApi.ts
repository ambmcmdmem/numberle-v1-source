import express from 'express';
import bodyParser from 'body-parser';
import Collation from '../module/Collation';
import Numberle from '../module/Numberle';
import { apiCheckDigit } from '../../module/numberleConfig';
import { accessAllowOrigin } from '../module/apiInformation';
const server = express();
const collation = new Collation();

server
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((request, response, next): void => {
    if (
      apiCheckDigit(Number(request.body.seed)) !==
      Number(request.body.checkDigit)
    )
      return;

    response.set({
      'Access-Control-Allow-Origin': accessAllowOrigin,
    });
    next();
  })
  .post('/collation', (request, response): void => {
    response.send(
      collation.statusOfProposedSolution(
        request.body.proposedSolution,
        new Numberle(request.body.seed).getAnswer()
      )
    );
  })
  .post('/answer', (request, response): void => {
    response.send(new Numberle(request.body.seed).getAnswer());
  })
  .listen(process.env.PORT || 3000);
