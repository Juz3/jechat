import React, { Fragment } from "react";
import socketClient from "socket.io-client";

const socket =
  process.env.NODE_ENV === "production"
    ? socketClient("/")
    : socketClient("http://localhost:5000/");

const canvasSize = { x: 1000, y: 600 };
const defaultBrushSize = 4;
const defaultCanvasColor = "rgb(5, 35, 100)";

class LiveSketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      currentColor: "#fff",
      previousColor: "#fff",
      colorSelection: ["#FFF", "#000", "#C22", "#2C2", "#115"],
      current: { x: 0, y: 0 },
      newWidth: null,
      newHeight: null,
      brushSize: defaultBrushSize,
      isEmitting: false
    };
  }

  componentDidMount() {
    socket.connect();
    var canvas = this.refs.canvas;
    if (!!canvas.getContext) {
      this.clearCanvas(null, null);
    }

    socket.on("liveSketch", this.onLiveDrawEvent);
    socket.on("liveSketchClearCanvas", this.onLiveClearEvent);
  }

  componentWillUnmount() {
    //console.log("componentWillUnmount");
    socket.off("liveSketch");
    socket.disconnect();
  }

  onMouseDown = e => {
    if (e.button === 2) {
      this.setState({
        drawing: true,
        current: { x: e.clientX, y: e.clientY },
        previousColor: this.state.currentColor,
        currentColor: defaultCanvasColor,
        isEmitting: true
      });
    } else {
      this.setState({
        drawing: true,
        current: { x: e.clientX, y: e.clientY },
        currentColor: this.state.previousColor,
        isEmitting: true
      });
    }
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
    var boundingOffset = canvas.getBoundingClientRect();
    this.draw(
      data.x0 + boundingOffset.left,
      data.y0 + boundingOffset.top,
      data.x1 + boundingOffset.left,
      data.y1 + boundingOffset.top,
      data.color,
      false
    );
  };

  onLiveClearEvent = data => {
    this.clearCanvas(null, null);
    console.log(data.msg);
  };

  draw = (x0, y0, x1, y1, color, isEmitting) => {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    var boundingOffset = canvas.getBoundingClientRect();
    //console.log("boundingoffset", boundingOffset);

    ctx.beginPath();
    ctx.moveTo(x0 - boundingOffset.left, y0 - boundingOffset.top);
    ctx.lineTo(x1 - boundingOffset.left, y1 - boundingOffset.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = this.state.brushSize;
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
      x0: x0 - boundingOffset.left,
      y0: y0 - boundingOffset.top,
      x1: x1 - boundingOffset.left,
      y1: y1 - boundingOffset.top,
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
    ctx.fillStyle = defaultCanvasColor;
    ctx.lineWidth = defaultBrushSize;

    const defaultColors = ["#FFF", "#000", "#C22", "#2C2", "#115"];

    this.setState({
      colorSelection: defaultColors,
      brushSize: defaultBrushSize,
      currentColor: "#fff",
      previousColor: "#fff"
    });

    if (x === null && y === null) {
      ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);
    } else {
      ctx.fillRect(0, 0, x, y);
    }
  };

  clearCanvasForAll = () => {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = defaultCanvasColor;
    ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);

    socket.emit("liveSketchClearCanvas", {
      msg: "Canvas cleared for all connected clients"
    });
  };

  resize = () => {
    var canvas = this.refs.canvas;
    canvas.width = this.state.newWidth;
    canvas.height = this.state.newHeight;

    this.clearCanvas(this.state.newWidth, this.state.newHeight);
  };

  setColor = e => {
    this.setState({
      currentColor: e.target.style.backgroundColor.toString(),
      previousColor: e.target.style.backgroundColor.toString()
    });
  };

  // Returns rand hex as color string
  getRndHexString = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Returns inclusive rand int
  getRnd = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   *  Generates weighed random colors. r = red, g = green, b = blue
   *  Returns weighted random color as 'rgb(xxx,xxx,xxx)' string.
   **/
  //
  getWeightedRandomColor = (r, g, b) => {
    var rndA, rndB, rndC;
    if (r) {
      rndA = this.getRnd(20, 255);
      rndB = this.getRnd(0, 50);
      rndC = this.getRnd(0, 50);
    } else if (g) {
      rndA = this.getRnd(0, 50);
      rndB = this.getRnd(20, 255);
      rndC = this.getRnd(0, 50);
    } else if (b) {
      rndA = this.getRnd(0, 50);
      rndB = this.getRnd(0, 50);
      rndC = this.getRnd(20, 255);
    }
    //console.log(`rgb(${rndA},${rndB},${rndC})`);
    return `rgb(${rndA},${rndB},${rndC})`;
  };

  /**
   *  Generates weighed palette of random colors in the order of spectrum.
   *  3 red, 3 green, 3 blue
   *  Set new color array to state color palette.
   **/
  addColor = () => {
    var newColorArray = [];

    for (var i = 0; i < 10; i++) {
      if (i === 0) {
        newColorArray.push("#FFF", "#000");
      } else if (i >= 1 && i < 4) {
        newColorArray.push(this.getWeightedRandomColor(true, false, false));
      } else if (i < 7 && i >= 4) {
        newColorArray.push(this.getWeightedRandomColor(false, true, false));
      } else if (i >= 7) {
        newColorArray.push(this.getWeightedRandomColor(false, false, true));
      }
    }

    //console.log(newColorArray);
    this.setState({ colorSelection: newColorArray });
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
          <div className="sketchTooltip">
            <p
              style={{
                color: this.state.currentColor,
                margin: "5px auto"
              }}
            >
              {/* {this.state.current.x}, {this.state.current.y} */}
              Brush size: {this.state.brushSize}
            </p>
            <input
              type="range"
              className="brushSizeInput"
              min="1"
              max="30"
              value={this.state.brushSize}
              step="1"
              onChange={e =>
                e.target.value < 31
                  ? this.setState({ brushSize: e.target.value })
                  : this.setState({ brushSize: defaultBrushSize })
              }
            ></input>
          </div>
          <div className="controlMenu">
            <button
              className="sketchBtn"
              onClick={e => this.clearCanvas(null, null)}
            >
              Reset
            </button>
            <button
              className="sketchBtn"
              style={{ marginLeft: "10px" }}
              onClick={e => this.clearCanvasForAll()}
            >
              Clear for all
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
            <div
              style={{
                width: "2em",
                height: "2em",
                margin: "10px 5px 5px 5px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1em"
              }}
              onClick={() => this.addColor()}
            >
              +
            </div>
          </div>

          <div className="canvasContainer">
            <canvas
              className="livecanvas"
              ref="canvas"
              width={canvasSize.x}
              height={canvasSize.y}
              onMouseDown={e => this.onMouseDown(e)}
              onMouseUp={e => this.onMouseUp(e)}
              onMouseOut={e => this.onMouseUp(e)}
              onMouseMove={e => this.onMouseMove(e)}
            ></canvas>
          </div>
          <h3 className="h3-main">
            <em>Live drawing canvas</em>
          </h3>
          <p className="p-2">
            <strong>Reset</strong> clears local canvas and resets settings.
          </p>
          <p className="p-2">
            <strong>Clear for all</strong> clears the canvas for all connected
            users.
          </p>

          <p className="p-2">
            <strong>Right click</strong> works as an eraser.{" "}
          </p>
          <p className="p-2">
            Use the <strong>+</strong> button for more random colors!
          </p>
        </div>
      </Fragment>
    );
  }
}

export default LiveSketch;
