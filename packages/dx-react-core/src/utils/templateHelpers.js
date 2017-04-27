export const combineTemplates = (userTemplate = () => undefined, defaultTemplate) => (props) => {
  let result = userTemplate(props);
  if (result === undefined) {
    result = defaultTemplate(props);
  }
  return result;
};
