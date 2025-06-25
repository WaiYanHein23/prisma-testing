import React from "react";
import { queryData } from "../../lib/getQueryOutput";
import { createUser } from "../../lib/createUser";

export default async function page({ searchPars }) {
  // const queryOutput = await queryData(searchPars);
  // console.log(queryOutput);

  const createUserAll = await createUser();
  console.log(JSON.stringify(createUserAll), null, 2);
  return <div> New page</div>;
}
