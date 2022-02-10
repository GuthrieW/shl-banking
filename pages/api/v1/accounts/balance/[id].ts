import { NextApiRequest, NextApiResponse } from "next";
import SQL from "sql-template-strings";
import Cors from "cors";
import { StatusCodes } from "http-status-codes";

const GET = "GET";

const allowedMethods = [GET];
const cors = Cors({
  methods: allowedMethods,
});

const index = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { method } = request;

  if (method === GET) {
    response.status(StatusCodes.OK).json({});
  }

  response.setHeader("Allowed", allowedMethods);
  response.status(StatusCodes.METHOD_NOT_ALLOWED).end();
};

export default index;
