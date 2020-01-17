import React, { Fragment } from "react";

class CanvasDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: true,
      canvas: this.refs.canvas,
      ctx: null,
      ballCount: null
    };
  }

  componentDidMount() {
    var canvas = this.refs.canvas;
    if (!!canvas.getContext) {
      const ctx = canvas.getContext("2d");
      this.setState({ ctx: ctx, canvas: canvas });
      this.drawCanvas(ctx);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  drawTimer = () => {
    this.timerID = setInterval(() => this.drawBalls(this.state.ctx, 15), 100);
  };

  drawWithButtonToggle = () => {
    if (!this.state.pause) {
      clearInterval(this.timerID);
      this.setState({ pause: true });
    } else {
      this.drawTimer();
      this.setState({ pause: false });
    }
  };

  drawCanvas = ctx => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1200, 600);
    ctx.fillStyle = "#FFF";

    this.setState({ ballCount: 0 });
  };

  // Draw random stars
  drawBalls = (ctx, n) => {
    if (typeof n === "number" && n < 10000) {
      for (var i = 0; i < n; i++) {
        const x = this.getRnd(0, 1200);
        const y = this.getRnd(0, 600);

        ctx.fillStyle = `rgba(
          ${this.getRnd(0, 20)}, 
          ${this.getRnd(0, 30)}, 
          ${this.getRnd(30, 250)}, 
          ${parseFloat(this.getRnd(50, 100) / 100)})`;

        ctx.strokeStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.arc(x, y, this.getRnd(3, 20), 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      }

      this.setState({ ballCount: this.state.ballCount + n });
    }
  };

  // Returns inclusive rand int
  getRnd = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    return (
      <Fragment>
        <div className="sketchContainer">
          <canvas
            className="canvas"
            ref="canvas"
            width={1200}
            height={600}
          ></canvas>
          <button
            className="sketchBtn"
            onClick={() => this.drawWithButtonToggle()}
          >
            Start/Stop
          </button>
          <button
            className="sketchBtn"
            onClick={() => this.drawCanvas(this.state.ctx)}
          >
            Clear
          </button>
          <p style={{ color: "#fff" }}>Ball Count: {this.state.ballCount}</p>
        </div>
      </Fragment>
    );
  }
}

export default CanvasDemo;
