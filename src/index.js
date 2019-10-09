function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  // write your solution here

  		//добавим пробелы вокруг операторов
          for (let i = 0; i < expr.length; i++) {
			if ( expr[i] == "*" || expr[i] == "/" || expr[i] == "+" || expr[i] == "-" || expr[i] == "(" || expr[i] == ")" ) {
				expr = expr.slice(0, i) + " " + expr[i] + " " + expr.slice(i+1);
				i++;
			} 
		}
		
		//console.log("теперь выражение такое: " + expr);
		
        let array = [];
      
		array = expr.split(" ");
        //console.log("получили массив из чисел и операторов: " + array);
        
        //console.log("теперь поудаляем все пробелы");
        for (let i = 0; i < array.length; i++) {
            if (array[i] == " ") {
               array.splice(i, 1);
               i--;
             }
        }	
        //console.log("после удаления пробелов массив выглядит так: " + array);
        
        //console.log("теперь избавимся от пустых строк где было два пробела");
        for (let i = 0; i < array.length; i++) {
            if (array[i] == "") {
                array.splice(i, 1);
                i--;
            }
        }	
        //console.log("после удаления пустых строк массив выглядит так: " + array);

		
        
        //переведем выражение в польскую нотацию
        let arrayOfOutputs = [];
        let stackOfOperators = [];
        let operators = ["+", "-", "*", "/"];
        let lowerPriorityOps = [operators[0], operators[1]];
        let higherPriorityOps = [operators[2], operators[3]];
        
        for (let i = 0; i < array.length; i++) {
            
            let element = array[i];
            
            if (+element == element) {
                //console.log(element + ": теущий элемент - число, кладем его в массив выхода");
                arrayOfOutputs.push(element);
                //console.log("массив выхода: " + arrayOfOutputs);
                //console.log("стек операторов: " + stackOfOperators);
				
            } else if (operators.includes(element)) {
                //console.log(element + ": теущий элемент - оператор");
                
                
                if (stackOfOperators.length == 0) {
                    //console.log("в стеке пусто, кладем текущий оператор в стек");
                    stackOfOperators.push(element);
					//console.log("массив выхода: " + arrayOfOutputs);
                    //console.log("стек операторов: " + stackOfOperators);
                    
                } else if ( (higherPriorityOps.includes(stackOfOperators[stackOfOperators.length - 1])) && (lowerPriorityOps.includes(element)) ) {			
                    //console.log("на вершине стек уже лежит оператор с бОлшьим приоритетом, чем у текущего элемента");
					
					let i = stackOfOperators.length - 1; //индекс последнего элемента в стеке
					
					if (stackOfOperators.includes("(")) {
						//console.log("октрывающая скобка в стеке есть");
						while (stackOfOperators[i] != "(") {
							if ( higherPriorityOps.includes(stackOfOperators[i]) || lowerPriorityOps.includes(stackOfOperators[i])) {
								//console.log("все знаки из стека бОльшего либо равного приоритета с текущим выталккиваются из стека в массив выхода до первой открыв скобки");
								arrayOfOutputs.push(stackOfOperators[i]);
							}

							i--;
						}
							
						while (stackOfOperators[stackOfOperators.length - 1] != "(") {
							//console.log("пока не встретим открыв скобку удаляем элементы из стека");
							stackOfOperators.pop();
						}
						
					} else {
						//console.log("октрывающей скобки в стеке нет - просто все знаки из стека бОльшего либо равного приоритета с текущим выталккиваются из стека в массив выхода пока он не станет пустой");
						for (i; i >= 0; i--) {
				          arrayOfOutputs.push(stackOfOperators[i]); //переместили всё из стека в массив
			            }
						
						while (stackOfOperators.length > 0) {
				           stackOfOperators.pop(); //убраем элементы из стека
			            }
											
					}
						
						
					
					stackOfOperators.push(element); //а текущий кладем в стек
					
					//console.log("массив выхода: " + arrayOfOutputs);
                    //console.log("стек операторов: " + stackOfOperators);
					
                    
                } else if ( ((higherPriorityOps.includes(stackOfOperators[stackOfOperators.length - 1])) && (higherPriorityOps.includes(element))) || ((lowerPriorityOps.includes(stackOfOperators[stackOfOperators.length - 1])) && (lowerPriorityOps.includes(element))) ) {
                    //console.log("у элемента на вершине стека и текущего элемента одинаковый приоритет");
                    //console.log("последний элемент стека перемещаем в массив выхода");
                    //console.log("а текущ элемент кладем в стек опараторов");
                    arrayOfOutputs.push(stackOfOperators[stackOfOperators.length - 1]);
                    stackOfOperators.pop();
                    stackOfOperators.push(element);
                    //console.log("массив выхода: " + arrayOfOutputs);
                    //console.log("стек операторов: " + stackOfOperators);
										
                } else if ( (lowerPriorityOps.includes(stackOfOperators[stackOfOperators.length - 1])) && (higherPriorityOps.includes(element)) ) {
                    //console.log("на вершине стек лежит оператор с МЕНЬШИМ приоритетом, чем у текущего элемента");
                    //console.log("добавляем текущ элемент в стек операторов");
                    stackOfOperators.push(element);
					//console.log("массив выхода: " + arrayOfOutputs);
                    //console.log("стек операторов: " + stackOfOperators);


                } else if (stackOfOperators[stackOfOperators.length - 1] == "(") {
                    //console.log("последний элемент стека - открывающая скобка");
                    //console.log("добавляем текущ элемент в стек операторов");
                    stackOfOperators.push(element);
					//console.log("массив выхода: " + arrayOfOutputs);
                    //console.log("стек операторов: " + stackOfOperators);

                    
                }
            }
            
            if (element == "(") {
                //console.log(element + ": текущ элемент - открывающая скобка, кладем в стек операторов");
                stackOfOperators.push(element);
                //console.log("массив выхода: " + arrayOfOutputs);
                //console.log("стек операторов: " + stackOfOperators);				
            }
            
            if (element == ")") {
                //console.log(element + ": текущ элемент - закрывающая скобка");
                //console.log("нужно переместить все элементы стека в массив выхода ДО первой открывающей скобки");
                
                let i = stackOfOperators.length - 1; //
				
				if (!stackOfOperators.includes("(")) {
					//console.log("в стеке нет открытой скобки, ошибка");
					throw new Error("ExpressionError: Brackets must be paired");
				} else {
					
					while (stackOfOperators[i] != "(") {
						arrayOfOutputs.push(stackOfOperators[i]);
						i--;
					}
                
					while (stackOfOperators[stackOfOperators.length - 1] != "(") {
						stackOfOperators.pop();
					}
                
					stackOfOperators.pop(); //убраем оставшуюся открытую скобку
                
					//console.log("массив выхода: " + arrayOfOutputs);
					//console.log("стек операторов: " + stackOfOperators);
				}
                
                
            }
            
            
            
        } //конец цикла
    
        //console.log("конец цикла");
        //console.log("массив выхода: " + arrayOfOutputs);
        //console.log("стек операторов: " + stackOfOperators);
        
		if (stackOfOperators.length != 0 && stackOfOperators.includes("(")) {
			throw new Error("ExpressionError: Brackets must be paired");
		}
		
		if (stackOfOperators.length != 0 && !stackOfOperators.includes("(")) {
			//console.log("в стеке что-то осталось -  перемещаем это в массив выхода");
			
			let i = stackOfOperators.length - 1; //индекс последнего элемента в стеке
			
			for (i; i >= 0; i--) {
				arrayOfOutputs.push(stackOfOperators[i]); //переместили всё из стека в массив
			}
			
			while (stackOfOperators.length > 0) {
				stackOfOperators.pop(); //убраем элементы из стека
			}
			
		}
		
		//console.log("массив выхода: " + arrayOfOutputs);
        //console.log("стек операторов: " + stackOfOperators);
		
		//теперь нужно посчитать выражение
		
		
		let stackOfNumbers = [];
		
		for (let i = 0; i < arrayOfOutputs.length; i++) {
			
			let element = arrayOfOutputs[i];
			
			if (+element == element) {
				//console.log(element + ": теущий элемент - число, кладем его в стек чисел");
				stackOfNumbers.push(+element);
				//console.log("стек чисел: " + stackOfNumbers);
			} else {
				//console.log(element + ": теущий элемент - оператор, выполняем соотв-ее действие над двумя последними числами в стеке чисел");
				if (element == "*") {
					stackOfNumbers.splice( stackOfNumbers.length - 2, 2, (stackOfNumbers[stackOfNumbers.length - 2] * stackOfNumbers[stackOfNumbers.length - 1]) );
				} else if (element == "/") {
					if (stackOfNumbers[stackOfNumbers.length - 1] == "0") {
						//console.log("делитель равен нулю - ошибка");
						throw new Error("TypeError: Division by zero.");
					} else {
						stackOfNumbers.splice( stackOfNumbers.length - 2, 2, ((stackOfNumbers[stackOfNumbers.length - 2] / stackOfNumbers[stackOfNumbers.length - 1])) );
					}
			
				} else if (element == "+") {
					stackOfNumbers.splice( stackOfNumbers.length - 2, 2, (stackOfNumbers[stackOfNumbers.length - 2] + stackOfNumbers[stackOfNumbers.length - 1]) );
				} else if (element == "-") {
					stackOfNumbers.splice( stackOfNumbers.length - 2, 2, (stackOfNumbers[stackOfNumbers.length - 2] - stackOfNumbers[stackOfNumbers.length - 1]) );
				}
			}
		}
		
		//console.log(stackOfNumbers);
		//получили массив с одним числом
		
		let result = stackOfNumbers[0];
		return result;




}

module.exports = {
    expressionCalculator
}