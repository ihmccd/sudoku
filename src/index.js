module.exports = function solveSudoku(arr) {
   
  
  let strSud= [];
  for (let i = 0; i< arr.length; i++){
    for (let j = 0; j< arr[i].length; j++)
      strSud.push(arr[i][j]);
  }
 //console.log(strSud);
  
  let zeroesArr =[];
  for (let i = 0; i< strSud.length; i++){
   if (strSud[i]==0){
     zeroesArr.push(i);
   } 
  }
  
  
  let zerosValues = [];
  zeroesArr.forEach(function(e){
    zerosValues.push(getOptionValues(getRowsColumns(strSud,e)));
  })
  
  
  //console.log(zerosValues);
  
  function getRowsColumns(arr,num){
    let arrSliceRow = arr.slice(Math.floor(num/9)*9,Math.floor(num/9)*9+9); 
 
    let arrSliceColumn = [];
    let  rowNumber = num%9;
    //console.log(rowNumber);
    
    while (rowNumber<arr.length){
      if (arr[rowNumber]!=0){
      arrSliceColumn.push(arr[rowNumber]);
      }
      rowNumber+=9;
    }
   

    //console.log([arrSliceRow, arrSliceColumn]);
   return [arrSliceRow, arrSliceColumn];
 }
  
  function getOptionValues(arrRowColumn){
    let values = [1,2,3,4,5,6,7,8,9];
    let option = [];
    //console.log(arrRowColumn[0]);
    values.forEach(function(e){
      //console.log(e, arrRowColumn[0].indexOf(e), arrRowColumn[1].indexOf(e));
      if (arrRowColumn[0].indexOf(e)<0 && arrRowColumn[1].indexOf(e)<0){
        option.push(e);
      }
    })
    //console.log(option);
    return option;
  }
  
  

  
  
  let solutionPath=[];
  let deadEnds=[];
  
  
  function stepBack(num){
      let deadEnd=solutionPath.pop();
      let prevNum = zeroesArr[zeroesArr.indexOf(num)-1];
      strSud[prevNum]=0;
      let prevNumOptions = getOptionValues(getRowsColumns(strSud,prevNum));
      if(!prevNumOptions[prevNumOptions.indexOf(deadEnd)+1]){
        stepBack(prevNum);
      }
      else{
        strSud[prevNum]=prevNumOptions[prevNumOptions.indexOf(deadEnd)+1];
        solutionPath.push(strSud[prevNum]);
      }
      
  }
  
  
  while(solutionPath.length<zeroesArr.length){
    let num=strSud.indexOf(0);
    //console.log(num);
    let posValues = getOptionValues(getRowsColumns(strSud,num));
    //console.log(posValues);
    if(posValues.length===0){
        stepBack(num);
    }
    else{
     strSud[num]= posValues[0];
     solutionPath.push(posValues[0]); 
    }
    }
    
    
  function editedArr(arr){
    let edited = [];
    for (let i = 0; i< arr.length; i+=9){
      let part = arr.slice(i,i+9);
      edited.push(part);
    }
    return edited;
  }
    
    
 // console.log(solutionPath, editedArr(strSud));
  return editedArr(strSud);
}



  //console.log(editedArr(tt));

