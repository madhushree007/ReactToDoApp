import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function FilterButton(props) {
  return (
    <div>
      <ul className="filter">
        <li>
          <button
            className="btn btn-light btn-sm"
            onClick={() => props.setFilter("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className="btn btn-light btn-sm"
            onClick={() => props.setFilter("completed")}
          >
            Completed
          </button>
        </li>
        <li>
          <button
            className="btn btn-light btn-sm"
            onClick={() => props.setFilter("active")}
          >
            Active
          </button>
        </li>
      </ul>
    </div>
  );
}
function TextInput(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.addItem(e.target.txt.value);
    e.target.txt.value = "";
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" id="txt" style={{ width: 300, height: 38 }} />
        &nbsp;
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
function RenderItem(props) {
  return (
    <li key={props.index}>
      <p
        style={{
          textDecoration: props.item.isComplete ? "line-through" : ""
        }}
      >
        {props.item.item}
      </p>
      <div>
        <button
          onClick={() => props.completeItem(props.index)}
          className="btn btn-primary"
        >
          Complete
        </button>
        <button
          onClick={() => props.deleteItem(props.index)}
          className="btn btn-danger"
        >
          X
        </button>
      </div>
    </li>
  );
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: "all"
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  addItem(item) {
    const newdata = [
      ...this.state.data,
      {
        id: this.state.data.length + 1,
        item: item,
        isComplete: false
      }
    ];
    this.setState({ data: newdata });
  }
  deleteItem(index) {
    // console.log(index);
    this.setState({
      data: [
        ...this.state.data.slice(0, index),
        ...this.state.data.slice(index + 1)
      ]
    });
  }
  completeItem(index) {
    const newData = [...this.state.data];
    newData[index].isComplete = !newData[index].isComplete;
    this.setState({ data: newData });
  }
  setFilter(filter) {
    this.setState({ filter: filter });
  }
  render() {
    const items = [...this.state.data];
    let newItems = [];
    if (this.state.filter === "all") {
      newItems = [...items];
    } else if (this.state.filter === "completed") {
      newItems = items.filter(item => item.isComplete);
    } else if (this.state.filter === "active") {
      newItems = items.filter(item => !item.isComplete);
    }

    return (
      <div className="container App">
        <h1>My First To Do App</h1>
        <ul className="lists">
          {newItems.map((item, index) => (
            <RenderItem
              key={index}
              index={index}
              item={item}
              completeItem={this.completeItem}
              deleteItem={this.deleteItem}
            />
          ))}
        </ul>
        <TextInput addItem={this.addItem} />
        <FilterButton setFilter={this.setFilter} />
      </div>
    );
  }
}
