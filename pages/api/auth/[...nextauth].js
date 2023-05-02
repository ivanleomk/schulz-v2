import NextAuth from "next-auth";

import { authOptions } from "../../../lib/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, authOptions);
