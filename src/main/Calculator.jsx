import React, {Component} from "react";
import './Calculator.css'
import Button from '../components/Button'
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values:[0, 0],
    current:0
}
export default class Calculator extends Component{

    state = {... initialState}
    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        console.log('limpar');
        this.setState({...initialState})
    }

    setOperation(op){
        console.log('setOperation ', op);
        if (this.state.current === 0){
            this.setState({operation: op, current: 1, clearDisplay: true})
        }
        else{
            const equals = op === '=';
            const currentOperation = this.state.operation;
            

            const values = {... this.state.values}
            try{
                values[0] = eval(`${values[0]} ${currentOperation === 'X' ? '*' : currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
                
            }
            catch(e){
                console.log(e)
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation : equals ? null : op,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        console.log('addDigit ', n);
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false})

        if (n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = {...this.state.values}
            values[i] = newValue
            this.setState({values})
        }

        
    }

    render(){

        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/"click={this.setOperation} operation/>
                <Button label="7"click={this.addDigit}/>
                <Button label="8"click={this.addDigit}/>
                <Button label="9"click={this.addDigit}/>
                <Button label="X"click={this.setOperation} operation/>
                <Button label="4"click={this.addDigit}/>
                <Button label="5"click={this.addDigit}/>
                <Button label="6"click={this.addDigit}/>
                <Button label="-"click={this.setOperation} operation/>
                <Button label="1"click={this.addDigit}/>
                <Button label="2"click={this.addDigit}/>
                <Button label="3"click={this.addDigit}/>
                <Button label="+"click={this.setOperation} operation/>
                <Button label="0"click={this.addDigit} double/>
                <Button label="."click={this.addDigit}/>
                <Button label="="click={this.setOperation} operation/>


            </div>
        )
    }
}