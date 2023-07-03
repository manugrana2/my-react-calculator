import { useState } from "react";
import React from "react";
import About from "./About";
function Calculator(){
    const numbers = ["CE","C","√","^","(",")","!","÷",1,2,3,"+",4,5,6,"-",7,8,9,"x",0,".","DEL","="]
    const [result, setResult] = useState("0"); 
    const [operation, setOperation] = useState(null); 
    const [onScreen, setOnSreen] = useState(false)
    const [calculated, setCalculated] = useState(false)
    function getValue(){
        let algebra = result;
        console.log("The input is ", algebra, " and type is", typeof(algebra));
        algebra = algebra.replaceAll("x","*");
        algebra = algebra.replaceAll("^","**")
        algebra = algebra.replaceAll("÷","/")
        algebra = algebra.replaceAll(/[\d|\)]\(/g, match => match.replace("(","*("))
        console.log("After formatting parenthesis is", algebra);
        algebra = algebra.replaceAll(/^\*\*+/gm, match => match.replace("**",NaN))
        algebra = algebra.replaceAll(/^\*+/gm,"")

        console.log("The operation is", algebra)
        try{
            console.log("The result is", eval(algebra));
        }
        catch{
            setResult("Syntax Error");
        }
        finally{
            let result = parseFloat(eval(algebra)).toPrecision(12);
            result = result.replace(/0+$/, "")
            result = result.replace(/\.$/, "")
            setResult(result.toString());
            setCalculated(true)
            return(eval(algebra))
        }
    }
    const handleClick = (prop) => (event) => {
        if(prop === "CE"){
            setResult("0");
            setCalculated(false);
        }else if(prop === "C" || prop === "DEL"){
            setCalculated(false)
            let onOperation = result;
            if( result.length <= 1 || result==="Syntax Error" || result==="NaN"){
                setCalculated(false)
                setResult("0")
            }
            else{
            setResult(onOperation.slice(0, -1))
            }
        }else if (prop === "="){
            getValue();
        }else if((calculated===true || result ==="0" || result === "NaN" || result ==="Syntax Error") && !isNaN(prop)){
                if(result==="Syntax Error" || result === "NaN" || !isNaN(prop) || result ==="0"){
                    let val = prop.toString()
                setResult(val);
                setCalculated(false)
                }
        }else if(prop === "√"){
            console.log("Typed √");
            let pre_result = parseFloat(getValue());
            try{
                setResult(Math.sqrt(pre_result).toString());
            }
            catch{
                console.log("An error ocurred");
                setResult("Syntax Error");
            }
            setCalculated(true)
        }
        else if(prop === "!"){
            let negation =NaN;
            let pre_result = parseFloat(getValue());
            try{
                negation = pre_result*-1
                setResult(negation)
            }
            catch{
                setResult("Syntax Error")
            }finally{
                setResult(negation.toString())
            }
        }
        else{
            if((calculated===true || result==="0") && (!isNaN(prop) || prop === "(" || prop===")")){
                let val = prop.toString()
                setResult(val);
                setCalculated(false)
            }else{
            let onOperation = (result+prop).toString();
            setResult(onOperation);
            setCalculated(false)
            }
        }
    }
    return(
        <>
        <div className="result">
        <div className="operation">
            {operation}
        </div>
        <div className="screen">
            {result.toString()}
        </div>
        </div>
        <div className="calculator">
            <div className="buttons">
                {numbers.map(number => <div 
                 onClick={handleClick(number)}
                 key={number}
                 >{number}
                 </div>)}
            </div>
        </div>
        <div className="app-info">
            <About></About>
        </div>
        </>
    )
}
export default Calculator;