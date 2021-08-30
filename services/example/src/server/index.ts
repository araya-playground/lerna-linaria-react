import { css } from "@linaria/core";
import { colors, getColors, spaces } from "@araya-playground/linaria-styles";

console.log("Hello world");

const className = css`
  color: ${colors.black};
  background-color: ${getColors("white")};
`;

/* FAIL: 
An error occurred when evaluating the expression:

  > Cannot read property '1' of undefined.

  Make sure you are not using a browser or Node specific API and all the variables are available in static context.
  Linaria have to extract pieces of your code to resolve the interpolated values.
  Defining styled component or class will not work inside:
    - function,
    - class,
    - method,
    - loop,
  because it cannot be statically determined in which context you use them.
  That's why some variables may be not defined during evaluation.
*/
const className2 = css`
  padding: ${spaces[1]};
`;

console.log(className);
