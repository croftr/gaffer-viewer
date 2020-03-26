export const test = () => {

  let dynamicLevels;
  let dynamicLanguageFocus;
  let dynamicActivityUse;
  let dynamicPupilTask;
  let dynamicCategory;

  const columns = [
    "level",
    "languageFocus",
    "activityUse",
    "pupilTask",
    "category"
  ];

  const resultData = [
    
  ]

  let resultArray = [];

  columns.forEach(column => {

    resultData.forEach(node => {
      // console.log("node", column, " ", node[column]);
      if (node[column] !== null) {
        node[column].forEach(item => {
          if (!IsInObject(item.value, resultArray))
            resultArray.push({
              label: item.label,
              value: item.value
            });
        });
      }
    });
    resultArray.sort(compareValues("label"));
    //set state
    switch (column) {
      case "level":
        dynamicLevels = resultArray;
        console.log("dynamic levels", dynamicLevels);
        resultArray = [];
        break;
      case "languageFocus":
        dynamicLanguageFocus = resultArray;
        resultArray = [];
        break;
      case "activityUse":
        dynamicActivityUse = resultArray;
        resultArray = [];
        break;
      case "pupilTask":
        dynamicPupilTask = resultArray;
        resultArray = [];
        break;
      case "category":
        dynamicCategory = resultArray;
        resultArray = [];
        break;
      default:
        break;
    }});

}
