import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import Cors from "cors";
import SQL from "sql-template-strings";

const POST = "POST";
const allowedMethods = [POST];
const cors = Cors({
  methods: allowedMethods,
});

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { method } = request;

  if (method === POST) {
    response.status(StatusCodes.OK).json({});
  }

  response.setHeader("Allowed", allowedMethods);
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end();
};
