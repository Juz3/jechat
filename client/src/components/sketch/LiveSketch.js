import React, { Fragment } from "react";
import socketClient from "socket.io-client";

const socket = socketClient("/");

class LiveSketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      currentColor: "#fff",
      colorSelection: ["#FFF", "#000", "#C22", "#2C2", "#115"],
      current: { x: 0, y: 0 },
      newWidth: null,
      newHeight: null,
      isEmitting: false
    };
  }

  componentDidMount() {
    var canvas = this.refs.canvas;
    if (!!canvas.getContext) {
      this.clearCanvas(null, null);
    }

    socket.on("liveSketch", this.onLiveDrawEvent);
  }

  componentWillUnmount() {
    //console.log("componentWillUnmount");
    socket.on("liveSketch", this.onLiveDrawEvent);
  }

  onMouseDown = e => {
    this.setState({
      drawing: true,
      current: { x: e.clientX, y: e.clientY },
      isEmitting: true
    });
  };

  onMouseMove = e => {
    if (!this.state.drawing) {
      return;
    }
    //this.setState({ drawing: false });
    this.draw(
      this.state.current.x,
      this.state.current.y,
      e.clientX,
      e.clientY,
      this.state.currentColor,
      this.state.isEmitting
    );

    this.setState({
      current: { x: e.clientX, y: e.clientY }
    });
  };

  onLiveDrawEvent = data => {
    var canvas = this.refs.canvas;
    var w = canvas.width;
    var h = canvas.height;
    this.draw(data.x0, data.y0, data.x1, data.y1, data.color, false);
  };

  draw = (x0, y0, x1, y1, color, isEmitting) => {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    //ctx = this.state.ctx;
    //console.log(1);

    var boundingOffset = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(x0 - boundingOffset.left, y0 - boundingOffset.top);
    ctx.lineTo(x1 - boundingOffset.left, y1 - boundingOffset.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();

    if (!isEmitting) {
      //console.log("returning");
      return;
    }

    /*     var w = canvas.width;
    var h = canvas.height; */

    socket.emit("liveSketch", {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      color: ctx.strokeStyle
    });
  };

  onMouseUp = e => {
    this.setState({
      drawing: false,
      isEmitting: false
    });
  };

  clearCanvas = (x, y) => {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(5, 35, 100)";

    if (x === null && y === null) {
      ctx.fillRect(0, 0, 1000, 600);
    } else {
      ctx.fillRect(0, 0, x, y);
    }
  };

  resize = () => {
    var canvas = this.refs.canvas;
    canvas.width = this.state.newWidth;
    canvas.height = this.state.newHeight;

    this.clearCanvas(this.state.newWidth, this.state.newHeight);
  };

  setColor = e => {
    this.setState({
      currentColor: e.target.style.backgroundColor.toString()
    });
  };

  render() {
    const colorPalette = this.state.colorSelection ? (
      this.state.colorSelection.map((color, index) => (
        <div
          key={index}
          style={{
            width: "2em",
            height: "2em",
            background: color,
            margin: "5px 5px 5px 5px"
          }}
          onClick={e => this.setColor(e)}
        ></div>
      ))
    ) : (
      <div>colors not loaded...</div>
    );

    return (
      <Fragment>
        <div className="sketchContainer">
          <p
            style={{
              color: this.state.currentColor,
              margin: "5px auto"
            }}
          >
            {this.state.current.x}, {this.state.current.y}
          </p>

          <div className="controlMenu">
            <button
              className="sketchBtn"
              onClick={e => this.clearCanvas(null, null)}
            >
              Clear
            </button>
          </div>

          <div className="resizeModal" style={{ display: "none" }}>
            <button className="sketchBtn" onClick={this.resize}>
              Resize
            </button>
            <form onSubmit={this.resize}>
              <input
                onChange={e => this.setState({ newWidth: e.target.value })}
              ></input>
              <input
                onChange={e => this.setState({ newHeight: e.target.value })}
              ></input>
            </form>
          </div>

          <div
            className="colorPalette"
            style={{ display: "flex", flexDirection: "row", margin: "auto" }}
          >
            {colorPalette}
          </div>

          <div className="canvasContainer">
            <canvas
              className="canvas"
              ref="canvas"
              width={1000}
              height={600}
              onMouseDown={e => this.onMouseDown(e)}
              onMouseUp={e => this.onMouseUp(e)}
              onMouseOut={e => this.onMouseUp(e)}
              onMouseMove={e => this.onMouseMove(e)}
            ></canvas>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LiveSketch;
