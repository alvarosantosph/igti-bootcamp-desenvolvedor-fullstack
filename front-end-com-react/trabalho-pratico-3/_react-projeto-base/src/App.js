import React, { Component } from 'react';
import Input from './components/Input'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      userInput: ''
    }
  };

  toCamelCase = (userInput) => {
    return (
      userInput.charAt(0).toLowerCase() +
      userInput
        .slice(1)
        .replace(/\W+(.)/g, (match, chr) => {
          return chr.toUpperCase();
        })
        .normalize("NFD")
        .replace(/[~´`^]/g, "")
    );
  };

  onlyConsonants = (userInput) => {
    return userInput.replace(/[aeiouAEIOU]/g, "");
  };

  onlyVowels = (userInput) => {
    return userInput.replace(/[^aeiouAEIOU]/g, "");
  };

  toSlug = (userInput) => {
    return userInput
      .toLowerCase()
      .normalize("NFD")
      .replace(/[~´`^]/g, "")
      .replaceAll(" ", "-");
  };

  toCsv = (userInput) => {
    return userInput
      .split(" ")
      .map((word) => (word ? `"${word}"` : ""))
      .join()
      .replaceAll(",", ";");
  };

  toNumeric = (userInput) => {
    return userInput
      .toUpperCase()
      .normalize("NFD")
      .replace(/[~´`^]/g, "")
      .replace(/O|L|E|A|S|T/g, (match) => {
        switch (match) {
          case "O":
            return "0";
          case "L":
            return "1";
          case "E":
            return "3";
          case "A":
            return "4";
          case "S":
            return "5";
          case "T":
            return "7";
          default:
            break;
        }
      });
  };

  toReverse = (userInput) => {
    return userInput.split("").reverse().join("");
  };

  handleChange = (event) => {
    this.setState({userInput: event.target.value});
  }
  
  render() {

    const { userInput } = this.state;

    return (
      <>
        <div className="container">
          <span className="title">react-text-transformer</span>
        </div>

        <div className="containerInput">
          <Input 
          label={'Digite um texto qualquer:'} 
          id={'originalText'} 
          disabled={false}
          handleChange={this.handleChange}
          value={userInput}
          />
        </div>

        <div className="container">
          <span className="subtitle">Transformações</span>
        </div>

        <div className="containerInput">
          <Input 
          label={'Texto invertido:'} 
          id={'invertedText'} 
          disabled={true}
          value={this.toReverse(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'Texto numérico:'} 
          id={'numericText'} 
          disabled={true}
          value={this.toNumeric(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'CSV:'} 
          id={'csvText'} 
          disabled={true}
          value={this.toCsv(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'Slug:'} 
          id={'slugText'} 
          disabled={true}
          value={this.toSlug(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'Somente vogais:'} 
          id={'vowelsText'} 
          disabled={true}
          value={this.onlyVowels(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'Somente consoantes:'} 
          id={'consoantsText'} 
          disabled={true}
          value={this.onlyConsonants(userInput)}
          />
        </div>

        <div className="containerInput">
          <Input 
          label={'Variável:'} 
          id={'variableText'} 
          disabled={true}
          value={this.toCamelCase(userInput)}
          />
        </div>

      </>
    );
  }
}
