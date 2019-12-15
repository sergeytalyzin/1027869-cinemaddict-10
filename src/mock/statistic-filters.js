const filterNames = [`All time`, `Today`, `Week`, `Month`, `Year`];

const generateFilterStatistic = () => {
  return filterNames.map((it) => {
    return {name: it};
  });
};

export {generateFilterStatistic};
