export const clsx = (...classnames: (string | boolean)[]): string => {
  return <string>classnames.reduce((class$, cur) => {
    if (cur === true) {
      return class$
    }
    return cur ? class$ + ' ' + cur : class$
  }, '')
}
