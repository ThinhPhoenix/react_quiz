// Shuffle Element in an array sourceArray
// demo :  arr = [1,2,3,4,5];   shuffle(arr); console.log(arr) -> 2,5,1,3,2
// Version 1.0.0.0

export function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}
