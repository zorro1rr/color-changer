import React from 'react';
import ReactDOM from 'react-dom';

class Random extends React.Component {
  constructor(props){
    super(props);
    //set a random color state for background on fresh page
    this.state = { color: [110, 79, 169] };
    //bind the handleClick because it uses .this to change(setState) the color
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  //method to make rgb color readable instead of 1 long number
  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }
  //method to make text light/dark based on opposite of the background color
  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }
  //method that actually changes the color
  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }
  //selects random numbers from 0-256 for rgb color code
  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }
  //event handler to attach to button
  handleClick(){
    this.setState({
      color: this.chooseColor()
    });
  }

  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>
          Your color is   {this.formatColor(this.state.color)}.
        </h1>
        <button light={this.isLight()} onClick={this.handleClick}> Press to change color
        </ button>
     </div>
    );
  }
}
//render the component 
ReactDOM.render(
  <Random />, 
  document.getElementById('app')
);