import React, { Component } from "react";

const formUnchange = {
  workspaceNameIsChanged: false,
  workspaceDescriptionIsChanged: false,
  modelTypeIsChanged: false,
  dateFromIsChanged: false,
  dateToIsChanged: false,
  alphaIsChanged: false,
  portfolioNameIsChanged: false
};

const initialState = {
  json: {},
  formData: {
    workspaceName: "Test Workspace",
    workspaceDescription: "",
    modelType: "Historical Monte-Carlo",
    dateFrom: "",
    dateTo: "",
    alpha: 0.95,
    portfolioName: "D"
  },
  formState: formUnchange
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      formData: { [name]: value },
      formState: { [name + "IsChanged"]: true }
    });
  };

  handleFileSelect = e => {
    var files = e.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (theFile => e => {
      console.log(e.target.result);
      this.addJsonToState(e.target.result);
    })(file);
    reader.readAsText(file);
  };

  addJsonToState(json) {
    var parsedJson = JSON.parse(json);
    this.setState({ json: parsedJson, formData: parsedJson });
  }

  handleDownload = e => {
    e.preventDefault();
    var a = document.createElement("a");
    var formData = this.state.formData;
    var json = JSON.stringify(formData);
    var file = new Blob([json], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "output.json";
    this.setState({ formState: formUnchange });
    a.click();
  };

  render() {
    return (
      <form className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={this.handleFileSelect}
        />
        <input
          name="workspaceName"
          type="text"
          value={this.state.formData.workspaceName}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.workspaceNameIsChanged ? "changed" : ""
          }`}
          maxLength="256"
        />
        <textarea
          name="workspaceDescription"
          rows="10"
          cols="30"
          value={this.state.formData.workspaceDescription}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.workspaceDescriptionIsChanged ? "changed" : ""
          }`}
          maxLength="4000"
        />
        <select
          name="modelType"
          value={this.state.formData.modelType}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.modelTypeIsChanged ? "changed" : ""
          }`}
        >
          <option value="Historical Monte-Carlo">Historical Monte-Carlo</option>
          <option value="Parametric Monte-Carlo">Parametric Monte-Carlo</option>
          <option value="Simulated Monte-Carlo">Simulated Monte-Carlo</option>
        </select>
        <input
          name="dateFrom"
          type="datetime-local"
          value={this.state.formData.dateFrom}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.dateFromIsChanged ? "changed" : ""
          }`}
        />
        <input
          name="dateTo"
          type="datetime-local"
          value={this.state.formData.dateTo}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.dateToIsChanged ? "changed" : ""
          }`}
        />
        <input
          name="alpha"
          type="number"
          step="0.01"
          value={this.state.formData.alpha}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.alphaIsChanged ? "changed" : ""
          }`}
          min="0"
          max="1"
        />
        <select
          name="portfolioName"
          value={this.state.formData.portfolioName}
          onChange={this.handleUserInput}
          className={`form-control ${
            this.state.formState.portfolioNameIsChanged ? "changed" : ""
          }`}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            if (this.state.json)
              this.setState({
                formState: formUnchange,
                formData: this.state.json
              });
          }}
        >
          отменить изменения
        </button>
        <button className="btn btn-primary" onClick={this.handleDownload}>
          сохранить изменения
        </button>
        <button
          className="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            this.setState(initialState);
          }}
        >
          очистить форму
        </button>
      </form>
    );
  }
}
export default Form;
