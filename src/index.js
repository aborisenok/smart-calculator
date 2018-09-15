class SmartCalculator {
  constructor(initialValue) {
    this.initialValue = `(${initialValue})`;
    this.numberOfOperations = 0;
  }

  add(number) {
    this.initialValue += `+(${number})`;
    this.numberOfOperations++;
    return this;
  }
  
  subtract(number) {
    this.initialValue += `-(${number})`;
    this.numberOfOperations++;
    return this;
  }

  multiply(number) {
    this.initialValue += `*(${number})`;
    this.numberOfOperations++;
    return this;
  }

  devide(number) {
    this.initialValue += `/(${number})`;
    this.numberOfOperations++;
    return this;
  }

  pow(number) {
    this.initialValue += `^(${number})`;
    this.numberOfOperations++;
    return this;
  }
  
  calculate(str){
  while(this.numberOfOperations-- > 0){
    if(str.search(/\(\-*\d+\)\^\(\-*\d+\)/) != -1){
      var expr;
      if(str.search(/\^\(\-*\d+\)\^\(\-*\d+\)/) !=-1){
        expr = str.match(/\^\(\-*\d+\)\^\(\-*\d+\)/g).pop();
      }else{
         expr = str.match(/\(\-*\d+\)\^\(\-*\d+\)/g)[0];
      }
      var values = expr.match(/\-*\d+/g);
      if(expr[0] == "^"){
        expr = expr.replace("^", "");
      }
      str = str.replace(expr, this.solve(+values[0], +values[1], "^"));
    } else
    if(str.search(/\(\-*\d+\)\*\(\-*\d+\)/) != -1){
      var expr = str.match(/\(\-*\d+\)\*\(\-*\d+\)/)[0];
      var values = expr.match(/\-*\d+/g);
      str = str.replace(expr, this.solve(+values[0], +values[1], "*"));
    } else
    if(str.search(/\(\-*\d+\)\/\(\-*\d+\)/) != -1){
      var expr = str.match(/\(\-*\d+\)\/\(\-*\d+\)/)[0];
      var values = expr.match(/\-*\d+/g);
      str = str.replace(expr, this.solve(+values[0], +values[1], "/"));
    } else
    if(str.search(/\(\-*\d+\)\-\(\-*\d+\)/) != -1){
      var expr = str.match(/\(\-*\d+\)\-\(\-*\d+\)/)[0];
      var values = expr.match(/\-*\d+/g);
      str = str.replace(expr, this.solve(+values[0], +values[1], "-"));
    }else
    if(str.search(/\(\-*\d+\)\+\(\-*\d+\)/) != -1){
      var expr = str.match(/\(\-*\d+\)\+\(\-*\d+\)/)[0];
      var values = expr.match(/\-*\d+/g);
      str = str.replace(expr, this.solve(+values[0], +values[1], "+"));
    }
  }  
  return +str.match(/\-*\d+/);
  }
  
  solve(a, b, sign){
  switch(sign) {
  case "+":  
    return `(${a + b})`;

  case "-":  
    return `(${a - b})`;
      
  case "*":  
    return `(${a * b})`;
      
  case "/":  
    return `(${a / b})`;
   
  case "^":  
    return `(${Math.pow(a, b)})`;
  }
}

  toString(){
    return this.calculate(this.initialValue);
  }
}

module.exports = SmartCalculator;
