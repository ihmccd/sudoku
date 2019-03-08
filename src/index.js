module.exports = function solveSudoku(arr) {
   
  //converts 9 arrays in 1
    
  let strSud= [];
  for (let i = 0; i< arr.length; i++){
    for (let j = 0; j< arr[i].length; j++)
      strSud.push(arr[i][j]);
  }

  // positions of values with 0
  
  let zeroesArr =[];
  for (let i = 0; i< strSud.length; i++){
   if (strSud[i]==0){
     zeroesArr.push(i);
   } 
  }
  
  let failsArr = []; // detects ded end meanings

  // builds row and column of 0 meaning

  function getRowsColumns(arr,num){
    let arrSliceRow = arr.slice(Math.floor(num/9)*9,Math.floor(num/9)*9+9); 
    let arrSliceColumn = [];
    let  colNumber = num%9;
    
    while (colNumber<arr.length){
      if (arr[colNumber]!=0){
        arrSliceColumn.push(arr[colNumber]);
      }
      colNumber+=9;
    }
   
   return [arrSliceRow, arrSliceColumn];
    }
  
  
 // builds arr with possible replacement calues for 0 

  function getOptionValues(arrRowColumn){
    let values = [1,2,3,4,5,6,7,8,9];
    let option = [];
    values.forEach(function(e){
      if (arrRowColumn[0].indexOf(e)<0 && arrRowColumn[1].indexOf(e)<0){
        option.push(e);
      }
    })
    return option;
  }
  
  // step back if dead end
  
  function stepBack(arrAll, num){
      failsArr[num]=[];
      let numPrev  = zeroesArr[zeroesArr.indexOf(num)-1];
      let exclude = arrAll[numPrev];
    if (!failsArr[numPrev]){
      failsArr[numPrev]=[];
    }
      failsArr[numPrev].push(exclude);
      arrAll[numPrev] = 0;   
  }
  
  
  // find meaning & try to replace; if dead end, step back to replace prev meaning
  // recursion
   
  function step(arrAll){
    let num = arrAll.indexOf(0);
    
    if (num<0){
      return arrAll;
    }
    
    let optArr = getOptionValues(getRowsColumns(arrAll,num));
    if (failsArr[num]){
      failsArr[num].forEach(function(e){;
        if(e){
        optArr.splice(optArr.indexOf(e),1);
    }
      })
    }
    if (optArr.length==0){
      stepBack(arrAll, num);
      return step(arrAll);
    }
      arrAll[num]=optArr[0];
      return step(arrAll);
      

}

  let temp = step(strSud); // solution 1 long arr
  
  // edit long arr into 1 with 9 sub arrs like task description

  function editedArr(arr){
    let edited = [];
    for (let i = 0; i< arr.length; i+=9){
      let part = arr.slice(i,i+9);
      edited.push(part);
    }
    return edited;
  }

 return editedArr(temp);
  //console.log(editedArr(tt));
}
