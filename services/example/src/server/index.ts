import { css } from "@linaria/core";
import { colors, getColors } from "../../../../packages/styles";

console.log("Hello world");

const className = css`
  color: ${colors.black};
  background-color: ${getColors("white")};
`;

console.log(className);
