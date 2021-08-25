import { css } from '@linaria/core';
import { colors } from '../../../../packages/styles';

console.log('Hello world')

const className = css`
color: ${colors.black}
`

console.log(className)